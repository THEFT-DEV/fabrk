/**
 * Components Grid - Column 4: Slider, Checkboxes, Select, Input Variants, Button Groups
 */
'use client';

import { useState } from 'react';
import { Download, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function GridColumnFour() {
  const [priceRange, setPriceRange] = useState([400]);

  return (
    <div className="space-y-4">
      {/* Slider */}
      <Card>
        <div className="p-4">
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[SLIDER]</h3>
          <p className={cn('mb-4 text-xs', mode.color.text.muted)}>Value: ${priceRange[0]}</p>
          <Slider value={priceRange} onValueChange={setPriceRange} max={800} min={200} step={10} aria-label="Price range slider" />
        </div>
      </Card>

      {/* Checkboxes */}
      <Card>
        <div className="p-4">
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[CHECKBOXES]</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="check-1" defaultChecked />
              <label htmlFor="check-1" className="text-xs">
                Marketing emails
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check-2" />
              <label htmlFor="check-2" className="text-xs">
                Product updates
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Select Menu */}
      <Card>
        <div className="p-4">
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[SELECT MENU]</h3>
          <Select defaultValue="option-1">
            <SelectTrigger className="text-xs" aria-label="Select an option">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option-1">Option 1</SelectItem>
              <SelectItem value="option-2">Option 2</SelectItem>
              <SelectItem value="option-3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Input Variants */}
      <Card>
        <div className="p-4">
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[INPUT TYPES]</h3>
          <div className="space-y-2">
            <Input type="email" placeholder="Email" aria-label="Email address" className="text-xs" />
            <Input type="password" placeholder="Password" aria-label="Password" className="text-xs" />
            <Input type="number" placeholder="Amount" aria-label="Amount" className="text-xs" />
          </div>
        </div>
      </Card>

      {/* Button Groups */}
      <Card>
        <div className="p-4">
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[BUTTON GROUP]</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              &gt; LEFT
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              &gt; CENTER
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              &gt; RIGHT
            </Button>
          </div>
        </div>
      </Card>

      {/* Action Buttons - Full width, no card */}
      <div className="space-y-2">
        <Button className="w-full text-xs">
          <Download className="mr-2 h-4 w-4" />
          &gt; DOWNLOAD
        </Button>
        <Button variant="outline" className="w-full text-xs">
          <Settings className="mr-2 h-4 w-4" />
          &gt; SETTINGS
        </Button>
        <Button variant="destructive" className="w-full text-xs">
          <Trash2 className="mr-2 h-4 w-4" />
          &gt; DELETE
        </Button>
      </div>
    </div>
  );
}
