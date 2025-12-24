/**
 * Create API Key Form
 * Form for creating new API keys with name and permissions
 */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { formatLabel } from '@/design-system';

interface CreateKeyFormProps {
  newKeyName: string;
  selectedPermissions: string[];
  isCreating: boolean;
  onNameChange: (name: string) => void;
  onTogglePermission: (permission: string) => void;
  onSubmit: () => void;
}

export function CreateKeyForm({
  newKeyName,
  selectedPermissions,
  isCreating,
  onNameChange,
  onTogglePermission,
  onSubmit,
}: CreateKeyFormProps) {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="keyName">{formatLabel('API Key Name')}</Label>
        <Input
          id="keyName"
          value={newKeyName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g., Production API, Mobile App, Testing"
        />
      </div>

      <div className="space-y-2">
        <Label>{formatLabel('Permissions')}</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="read"
              checked={selectedPermissions.includes('read')}
              onCheckedChange={() => onTogglePermission('read')}
            />
            <Label htmlFor="read" className="cursor-pointer">
              {formatLabel('Read - View organization data')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="write"
              checked={selectedPermissions.includes('write')}
              onCheckedChange={() => onTogglePermission('write')}
            />
            <Label htmlFor="write" className="cursor-pointer">
              {formatLabel('Write - Create and update resources')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="admin"
              checked={selectedPermissions.includes('admin')}
              onCheckedChange={() => onTogglePermission('admin')}
            />
            <Label htmlFor="admin" className="text-destructive cursor-pointer">
              {formatLabel('Admin - Full admin access (dangerous)')}
            </Label>
          </div>
        </div>
      </div>

      <Button onClick={onSubmit} disabled={isCreating} className="w-full">
        {isCreating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            &gt; CREATING...
          </>
        ) : (
          '&gt; CREATE API KEY'
        )}
      </Button>
    </div>
  );
}
