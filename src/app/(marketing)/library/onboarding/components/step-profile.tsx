/**
 * FABRK COMPONENT
 * Step Profile - Profile information form
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const roles = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'product', label: 'Product Manager' },
  { value: 'founder', label: 'Founder / CEO' },
  { value: 'other', label: 'Other' },
];

interface StepProfileProps {
  fullName: string;
  role: string;
  onFullNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

export function StepProfile({ fullName, role, onFullNameChange, onRoleChange }: StepProfileProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={cn(mode.font, 'mb-1 text-xl font-semibold')}>Your Profile</h2>
        <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
          Tell us a bit about yourself
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className={cn(mode.font, 'text-xs')}>[FULL NAME]:</Label>
          <Input
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className={cn(mode.radius, mode.font, 'text-sm')}
          />
        </div>

        <div className="space-y-2">
          <Label className={cn(mode.font, 'text-xs')}>[YOUR ROLE]:</Label>
          <Select value={role} onValueChange={onRoleChange}>
            <SelectTrigger className={cn(mode.radius, mode.font, 'text-sm')}>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className={cn(mode.radius)}>
              {roles.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  className={cn(mode.font, 'text-left text-sm')}
                >
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
