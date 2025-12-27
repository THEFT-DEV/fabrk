# Backup & Recovery Guide

Complete guide to backing up your Fabrk SaaS and recovering from disasters.

---

## Table of Contents

1. [Backup Philosophy](#backup-philosophy)
2. [What to Backup](#what-to-backup)
3. [Database Backups](#database-backups)
4. [Code & Configuration Backups](#code--configuration-backups)
5. [File Storage Backups](#file-storage-backups)
6. [Secrets & Environment Variables](#secrets--environment-variables)
7. [Backup Automation](#backup-automation)
8. [Disaster Recovery Plan](#disaster-recovery-plan)
9. [Testing Backups](#testing-backups)
10. [Recovery Scenarios](#recovery-scenarios)

---

## Backup Philosophy

**3-2-1 Backup Rule:**
- **3 copies** of your data (original + 2 backups)
- **2 different media types** (local + cloud)
- **1 offsite** backup (different location/provider)

**Why backups matter:**
- Human error (accidental deletion)
- Security incidents (ransomware, data breach)
- Infrastructure failure (provider outage)
- Compliance requirements (GDPR, data retention)

**Recovery Time Objective (RTO):** How long can you be down?
- **Critical:** <1 hour (database, API)
- **Important:** <4 hours (website, features)
- **Nice-to-have:** <24 hours (analytics, logs)

**Recovery Point Objective (RPO):** How much data can you lose?
- **Critical:** <15 minutes (transactional data)
- **Important:** <1 hour (user data)
- **Nice-to-have:** <24 hours (logs, analytics)

---

## What to Backup

### 1. Database (Critical - RPO: <15 minutes)

**What:**
- User accounts
- Payment records
- Sessions
- Verification tokens

**Backup frequency:** Continuous (with WAL archiving) or hourly

---

### 2. Code & Configuration (Important - RPO: <1 hour)

**What:**
- Source code (Git repository)
- Configuration files
- Environment variables
- Deployment scripts

**Backup frequency:** On every commit (Git), weekly manual export

---

### 3. File Storage (Important - RPO: <1 hour)

**What:**
- User uploads (if applicable)
- Generated reports
- Cached assets
- Logs

**Backup frequency:** Daily

---

### 4. Secrets (Critical - RPO: <1 hour)

**What:**
- API keys (Stripe, Resend, etc.)
- Database credentials
- NextAuth secret
- OAuth secrets

**Backup frequency:** On change, stored securely (password manager)

---

## Database Backups

### Automated Backups (Recommended)

**Using Vercel Postgres:**

- **Automatic daily backups** (7-day retention)
- **Point-in-time recovery** (PITR) within retention window
- **No configuration needed**

**Using Supabase:**

- **Automatic daily backups** (7-day retention on free tier)
- **Point-in-time recovery** (on Pro plan)
- Manual backups available

**Using AWS RDS:**

- **Automated daily backups** (configurable retention: 1-35 days)
- **Automated backups during maintenance window**
- Manual snapshots (retained until deleted)

---

### Manual Database Backup (pg_dump)

**Full backup:**

```bash
# Backup entire database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

# Compressed backup (saves space)
pg_dump $DATABASE_URL | gzip > backup-$(date +%Y%m%d-%H%M%S).sql.gz
```

**Schema-only backup:**

```bash
# Backup schema (no data)
pg_dump --schema-only $DATABASE_URL > schema-$(date +%Y%m%d).sql
```

**Data-only backup:**

```bash
# Backup data (no schema)
pg_dump --data-only $DATABASE_URL > data-$(date +%Y%m%d).sql
```

**Table-specific backup:**

```bash
# Backup single table
pg_dump --table=User $DATABASE_URL > users-$(date +%Y%m%d).sql
```

---

### Scheduled Backups (Cron)

**Daily backup script:**

```bash
#!/bin/bash
# backup-db.sh

# Configuration
BACKUP_DIR="/var/backups/postgres"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup-$DATE.sql.gz"
RETENTION_DAYS=30

# Create backup
echo "Starting backup at $DATE"
pg_dump $DATABASE_URL | gzip > $BACKUP_FILE

# Upload to S3 (optional)
aws s3 cp $BACKUP_FILE s3://my-backups/postgres/

# Delete old backups (keep last 30 days)
find $BACKUP_DIR -name "backup-*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $BACKUP_FILE"
```

**Schedule with cron:**

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup-db.sh >> /var/log/backup.log 2>&1
```

---

### Database Restore

**Full restore:**

```bash
# Decompress backup
gunzip backup-20250106-020000.sql.gz

# Drop existing database (⚠️ Destructive!)
dropdb fabrk

# Create new database
createdb fabrk

# Restore backup
psql $DATABASE_URL < backup-20250106-020000.sql
```

**Restore specific table:**

```bash
# Extract table from backup
pg_restore -t User backup-20250106-020000.sql > users.sql

# Restore table
psql $DATABASE_URL < users.sql
```

**Point-in-time restore (if supported):**

```bash
# Restore database to specific timestamp
# (Available on AWS RDS, Supabase Pro, managed PostgreSQL)

# Example with AWS RDS (via console or CLI)
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier mydb \
  --target-db-instance-identifier mydb-restored \
  --restore-time 2025-01-06T12:00:00Z
```

---

## Code & Configuration Backups

### Git Repository (Primary Backup)

**Already backed up on GitHub:**

- Every commit is a backup
- Full history preserved
- Branches backed up

**Additional offsite backup:**

```bash
# Clone to separate location
git clone --mirror https://github.com/yourusername/fabrk.git

# Or backup to GitLab/Bitbucket
git remote add gitlab https://gitlab.com/yourusername/fabrk.git
git push gitlab --all
```

---

### Configuration Files

**Backup `.env.local`:**

```bash
# ⚠️ Never commit to Git! Store securely.

# Option 1: Password manager (1Password, Bitwarden)
# Option 2: Encrypted backup

# Encrypt .env.local
gpg --symmetric --cipher-algo AES256 .env.local
# Creates .env.local.gpg

# Decrypt
gpg .env.local.gpg
```

---

### Vercel Deployment Configuration

**Export Vercel configuration:**

```bash
# Install Vercel CLI
npm install -g vercel

# Download environment variables
vercel env pull .env.production

# Backup to secure location
cp .env.production ~/backups/vercel-env-$(date +%Y%m%d).env
```

---

## File Storage Backups

### User Uploads (if applicable)

**Using Vercel Blob or S3:**

```bash
# Backup Vercel Blob (via API)
curl -X GET https://blob.vercel-storage.com/list \
  -H "Authorization: Bearer $BLOB_READ_WRITE_TOKEN" \
  > blob-inventory-$(date +%Y%m%d).json

# Backup AWS S3
aws s3 sync s3://my-bucket /local/backup/s3/

# Or enable S3 versioning (automatic backup)
aws s3api put-bucket-versioning \
  --bucket my-bucket \
  --versioning-configuration Status=Enabled
```

---

### Generated Reports & Logs

**Backup logs:**

```bash
# Export Vercel logs (last 7 days)
vercel logs --since 7d > logs-$(date +%Y%m%d).txt

# Or use log aggregation service (Datadog, Logtail)
```

---

## Secrets & Environment Variables

### Store in Password Manager

**Recommended: 1Password, Bitwarden, or LastPass**

**What to store:**
- DATABASE_URL
- NEXTAUTH_SECRET
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- RESEND_API_KEY
- All OAuth secrets

**Create backup entry:**

```
Title: Fabrk Production Environment Variables
Username: production
Password: [Leave empty]
Notes:
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
...

Tags: backup, production, fabrk
```

---

### Export from Vercel

```bash
# Export all environment variables
vercel env pull .env.production

# Encrypt and store
gpg --symmetric --cipher-algo AES256 .env.production

# Upload to secure storage (Dropbox, Google Drive with encryption)
```

---

## Backup Automation

### Automated Backup Script

**backup-all.sh:**

```bash
#!/bin/bash

# Configuration
BACKUP_ROOT="/var/backups/fabrk"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="$BACKUP_ROOT/$DATE"

# Create backup directory
mkdir -p $BACKUP_DIR

echo "Starting full backup at $DATE"

# 1. Backup database
echo "Backing up database..."
pg_dump $DATABASE_URL | gzip > $BACKUP_DIR/database.sql.gz

# 2. Backup Prisma schema
echo "Backing up Prisma schema..."
cp prisma/schema.prisma $BACKUP_DIR/schema.prisma

# 3. Backup environment variables (encrypted)
echo "Backing up environment variables..."
gpg --symmetric --cipher-algo AES256 --batch --yes --passphrase "$GPG_PASSPHRASE" \
  -o $BACKUP_DIR/env.gpg .env.local

# 4. Create archive
echo "Creating archive..."
tar -czf $BACKUP_ROOT/backup-$DATE.tar.gz -C $BACKUP_ROOT $DATE

# 5. Upload to cloud (S3, Dropbox, etc.)
echo "Uploading to cloud..."
aws s3 cp $BACKUP_ROOT/backup-$DATE.tar.gz s3://my-backups/fabrk/

# 6. Clean up
rm -rf $BACKUP_DIR

# 7. Rotate old backups (keep last 30 days)
find $BACKUP_ROOT -name "backup-*.tar.gz" -type f -mtime +30 -delete

echo "Backup completed: backup-$DATE.tar.gz"
```

**Schedule:**

```bash
# Daily at 2 AM
0 2 * * * /path/to/backup-all.sh >> /var/log/backup-all.log 2>&1
```

---

### GitHub Actions Backup

**`.github/workflows/backup.yml`:**

```yaml
name: Backup

on:
  schedule:
    - cron: "0 2 * * *" # Daily at 2 AM UTC
  workflow_dispatch: # Manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up PostgreSQL client
        run: sudo apt-get install -y postgresql-client

      - name: Backup database
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          pg_dump $DATABASE_URL | gzip > backup-$(date +%Y%m%d).sql.gz

      - name: Upload backup to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp backup-$(date +%Y%m%d).sql.gz s3://my-backups/fabrk/

      - name: Notify on failure
        if: failure()
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK_URL }} \
            -H "Content-Type: application/json" \
            -d '{"text": "❌ Backup failed!"}'
```

---

## Disaster Recovery Plan

### Scenario 1: Database Corruption

**Symptoms:** Database errors, data inconsistency

**Recovery steps:**

1. **Stop all writes** (maintenance mode)
2. **Identify last good backup** (check backup timestamps)
3. **Restore from backup:**

```bash
# Create new database
createdb fabrk-recovered

# Restore backup
psql postgresql://user:pass@host:5432/fabrk-recovered < backup-20250106.sql

# Verify data integrity
psql postgresql://user:pass@host:5432/fabrk-recovered -c "SELECT COUNT(*) FROM \"User\";"

# Switch to recovered database
# Update DATABASE_URL in Vercel
vercel env rm DATABASE_URL production
vercel env add DATABASE_URL production
# Enter new DATABASE_URL: postgresql://user:pass@host:5432/fabrk-recovered

# Redeploy
vercel deploy --prod
```

4. **Verify application works**
5. **Exit maintenance mode**

**Expected downtime:** 30-60 minutes

---

### Scenario 2: Vercel Outage

**Symptoms:** Site down, Vercel status page shows incident

**Recovery steps:**

1. **Check Vercel status:** https://www.vercel-status.com/
2. **If prolonged outage, deploy to backup hosting:**

**Option A: Deploy to Netlify:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

**Option B: Deploy to Fly.io:**

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Create app
fly launch

# Deploy
fly deploy
```

3. **Update DNS** (point to new hosting)
4. **Update environment variables** on new platform

**Expected downtime:** 2-4 hours

---

### Scenario 3: Security Breach

**Symptoms:** Unauthorized access, suspicious activity

**Immediate actions:**

1. **Revoke all credentials:**

```bash
# Rotate all secrets
openssl rand -base64 32 # New NEXTAUTH_SECRET

# Rotate Stripe keys (via Stripe Dashboard)
# Rotate Resend key (via Resend Dashboard)
```

2. **Force logout all users:**

```sql
-- Delete all sessions
DELETE FROM "Session";
```

3. **Backup current state** (for forensics)

```bash
pg_dump $DATABASE_URL > breach-snapshot-$(date +%Y%m%d-%H%M%S).sql
```

4. **Restore from last known good backup:**

```bash
# Restore database
psql $DATABASE_URL < backup-last-known-good.sql
```

5. **Notify affected users** (if data exposed)

**Expected downtime:** 4-8 hours

---

### Scenario 4: Accidental Data Deletion

**Symptoms:** User reports missing data

**Recovery steps:**

1. **Identify affected data** (tables, rows)
2. **Find last backup before deletion:**

```bash
# List backups
ls -lh /var/backups/postgres/

# Or check S3
aws s3 ls s3://my-backups/fabrk/
```

3. **Extract affected data from backup:**

```bash
# Restore to temporary database
createdb fabrk-temp
psql fabrk-temp < backup-20250106.sql

# Export affected data
psql fabrk-temp -c "COPY (SELECT * FROM \"User\" WHERE id = 'user-id') TO STDOUT WITH CSV HEADER" > deleted-user.csv

# Import back to production
psql $DATABASE_URL -c "\COPY \"User\" FROM 'deleted-user.csv' CSV HEADER"
```

4. **Verify restoration**

**Expected downtime:** <1 hour (no downtime if surgical restore)

---

## Testing Backups

**Why test?**
- Ensure backups are valid
- Practice recovery procedures
- Identify issues before disaster strikes

**Quarterly backup test:**

```bash
# 1. Create test database
createdb fabrk-test

# 2. Restore latest backup
psql fabrk-test < latest-backup.sql

# 3. Verify data
psql fabrk-test -c "SELECT COUNT(*) FROM \"User\";"
psql fabrk-test -c "SELECT COUNT(*) FROM \"Payment\";"

# 4. Test application with test database
DATABASE_URL="postgresql://localhost/fabrk-test" npm run dev

# 5. Verify critical flows (login, checkout)

# 6. Clean up
dropdb fabrk-test
```

**Document results:**

```markdown
# Backup Test - 2025-01-06

**Backup file:** backup-20250106-020000.sql.gz
**Backup size:** 45 MB
**Backup age:** 3 days

**Test results:**
- ✅ Backup file intact
- ✅ Database restored successfully
- ✅ All tables present
- ✅ Data counts match production
- ✅ Application functions correctly

**Time to restore:** 5 minutes

**Issues:** None

**Next test:** 2025-04-06
```

---

## Recovery Scenarios

### Quick Recovery Checklist

**Minor incident (<1 hour downtime):**
- [ ] Identify issue
- [ ] Check if can fix without restore
- [ ] If restore needed, use latest backup
- [ ] Verify restoration
- [ ] Monitor for 30 minutes

**Major incident (>1 hour downtime):**
- [ ] Activate incident response team
- [ ] Communicate with users (status page)
- [ ] Restore from backup
- [ ] Run full test suite
- [ ] Gradual rollout
- [ ] Post-mortem within 48 hours

**Catastrophic incident (data breach, complete loss):**
- [ ] Activate disaster recovery plan
- [ ] Notify stakeholders (users, legal, PR)
- [ ] Restore from offsite backup
- [ ] Full security audit
- [ ] Implement preventive measures
- [ ] Public post-mortem

---

## Backup Checklist

### Daily
- [ ] Verify automated database backup ran
- [ ] Check backup file size (should be consistent)
- [ ] Monitor backup storage usage

### Weekly
- [ ] Test database restore (sample backup)
- [ ] Verify offsite backups uploaded
- [ ] Export environment variables to password manager

### Monthly
- [ ] Full backup restoration test
- [ ] Review backup retention policy
- [ ] Test disaster recovery procedures

### Quarterly
- [ ] Full disaster recovery drill
- [ ] Update recovery documentation
- [ ] Review and update backup strategy

---

## Backup Cost Optimization

**Storage costs:**

| Provider | Cost | Retention | Notes |
|----------|------|-----------|-------|
| Vercel Postgres | Included | 7 days | Free with Pro plan |
| AWS S3 | $0.023/GB/month | Unlimited | Standard storage |
| AWS S3 Glacier | $0.004/GB/month | Unlimited | Long-term archive |
| Backblaze B2 | $0.005/GB/month | Unlimited | Cheaper S3 alternative |

**Recommendations:**

1. **Hot backups (last 7 days):** Vercel Postgres, AWS S3 Standard
2. **Cold backups (30+ days):** AWS S3 Glacier, Backblaze B2
3. **Offsite:** Different cloud provider (avoid single point of failure)

---

## Additional Resources

- **PostgreSQL Backup:** https://www.postgresql.org/docs/current/backup.html
- **AWS RDS Backup:** https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres

---

**Test your backups. The worst time to discover a backup doesn't work is during a disaster. 💾**

**Questions? Email support@fabrk.dev.**
