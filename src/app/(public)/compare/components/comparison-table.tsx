import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { COMPARISON_FEATURES, CATEGORIES } from './comparison-data';

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-success" />
    ) : (
      <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
    );
  }
  return <span className="text-sm">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="space-y-12">
      {CATEGORIES.map((category) => {
        const features = COMPARISON_FEATURES.filter((f) => f.category === category);
        if (features.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-primary">
              [{category}]
            </h3>
            <div className={cn('overflow-hidden border border-border', mode.radius)}>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      FEATURE
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-primary">
                      FABRK
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      TYPICAL BOILERPLATE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={feature.name}
                      className={cn(
                        'border-b border-border/50',
                        i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                      )}
                    >
                      <td className="px-4 py-3 text-sm font-medium">{feature.name}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-primary">
                        <FeatureValue value={feature.fabrk} />
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                        <FeatureValue value={feature.typical} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
