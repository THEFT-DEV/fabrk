/**
 * User Profile Page
 * Complete profile view and edit
 */

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera, Mail, User, Calendar, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { mode, formatLabel } from '@/design-system';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: '',
    website: '',
    twitter: '',
    github: '',
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile');
      }
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Avatar updated');
        // Refresh session
        window.location.reload();
      } else {
        toast.error('Failed to upload avatar');
      }
    } catch {
      toast.error('Failed to upload avatar');
    }
  };

  const userInitials =
    session?.user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      {/* Avatar & Basic Info */}
      <Card>
        <CardHeader
          code="0x00"
          title="PROFILE PICTURE"
          icon={<Camera className="h-4 w-4" />}
          meta="Update your profile picture and personal details"
        />
        <CardContent className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session?.user?.image || ''} />
                <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className={cn(
                  'bg-primary hover:bg-primary/90 absolute right-0 bottom-0 cursor-pointer p-2 transition',
                  mode.radius
                )}
              >
                <Camera className="text-primary-foreground h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold">{session?.user?.name}</h3>
              <p className="text-muted-foreground text-sm">{session?.user?.email}</p>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {(session?.user as { role?: string })?.role || 'USER'}
                </Badge>
                <Badge variant="outline">
                  {(session?.user as { tier?: string })?.tier || 'FREE'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className={cn('flex items-center gap-4 border p-4', mode.radius)}>
              <Mail className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-muted-foreground text-sm">{session?.user?.email}</p>
              </div>
            </div>

            <div className={cn('flex items-center gap-4 border p-4', mode.radius)}>
              <User className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Account Type</p>
                <p className="text-muted-foreground text-sm">Personal</p>
              </div>
            </div>

            <div className={cn('flex items-center gap-4 border p-4', mode.radius)}>
              <Calendar className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-muted-foreground text-sm">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className={cn('flex items-center gap-4 border p-4', mode.radius)}>
              <Shield className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Security</p>
                <p className="text-muted-foreground text-sm">
                  2FA{' '}
                  {(session?.user as { mfaEnabled?: boolean })?.mfaEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Card>
        <CardHeader
          code="0x01"
          title="PROFILE DETAILS"
          icon={<User className="h-4 w-4" />}
          meta="Update your bio and social links"
        />
        <CardContent className="space-y-4">
          {!isEditing && (
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(true)}>&gt; EDIT PROFILE</Button>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">{formatLabel('Display Name')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{formatLabel('Bio')}</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">{formatLabel('Website')}</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">{formatLabel('Twitter')}</Label>
              <Input
                id="twitter"
                placeholder="@username"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">{formatLabel('GitHub')}</Label>
              <Input
                id="github"
                placeholder="username"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form
                }}
              >
                &gt; CANCEL
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? '&gt; SAVING...' : '&gt; SAVE CHANGES'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
