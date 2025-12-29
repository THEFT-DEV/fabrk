export function RunningWorkersSection() {
  return {
    title: 'Running Workers',
    description: 'Start workers for different queues',
    code: `# Development (with auto-restart)
npm run jobs:dev        # Default queue worker
npm run email:dev       # Email queue worker

# Production
node scripts/worker.js
QUEUE=email node scripts/worker.js
QUEUE=webhooks node scripts/worker.js

# Docker Compose example
# docker-compose.yml
services:
  app:
    build: .
    command: npm start

  worker-default:
    build: .
    command: node scripts/worker.js
    environment:
      - QUEUE=default

  worker-email:
    build: .
    command: node scripts/worker.js
    environment:
      - QUEUE=email

  worker-webhooks:
    build: .
    command: node scripts/worker.js
    environment:
      - QUEUE=webhooks`,
    language: 'bash',
  };
}
