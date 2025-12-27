# E-commerce Components Guide

Complete guide to building e-commerce features with Fabrk components.

## Overview

The e-commerce suite includes 3 components for a complete shopping experience:

- **Product Card** - Display products with ratings, pricing, and cart actions
- **Shopping Cart** - Full cart interface with quantity management and checkout
- **Checkout Form** - Multi-step checkout flow with validation

## Product Card

Display products in grids, lists, or carousels.

### Basic Usage

```tsx
import { ProductCard } from '@/components/ui/product-card';

const product = {
  id: '1',
  name: 'Premium Widget',
  description: 'High-quality widget for all your needs',
  image: '/products/widget.jpg',
  price: 99.99,
  currency: 'USD',
  rating: 4.5,
  reviewCount: 128,
  stock: 15,
};

<ProductCard
  product={product}
  onAddToCart={(product) => addToCart(product)}
  onQuickView={(product) => openQuickView(product)}
  onToggleFavorite={(product) => toggleFavorite(product)}
  isFavorite={false}
/>
```

### Props

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  hoverImage?: string; // Show on hover
  price: number;
  salePrice?: number; // Show strikethrough on original
  currency?: string; // Default: 'USD'
  rating?: number; // 0-5
  reviewCount?: number;
  stock?: number; // Show "Only X left" warning
  badge?: {
    text: string; // e.g., "NEW", "SALE", "-20%"
    variant: 'new' | 'sale' | 'hot';
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  showRating?: boolean; // Default: true
  showStock?: boolean; // Default: true
  variant?: 'default' | 'compact';
  className?: string;
}
```

### Product Grid

```tsx
export default function ProductGrid() {
  const products = [
    {
      id: '1',
      name: 'Premium Widget',
      description: 'High-quality widget',
      image: '/products/widget-1.jpg',
      hoverImage: '/products/widget-1-alt.jpg',
      price: 99.99,
      salePrice: 79.99,
      rating: 4.5,
      reviewCount: 128,
      stock: 15,
      badge: { text: 'SALE', variant: 'sale' },
    },
    // More products...
  ];

  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart`);
  };

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(product.id)}
        />
      ))}
    </div>
  );
}
```

### Sale Products

```tsx
const saleProduct = {
  id: '1',
  name: 'Premium Widget',
  description: 'Limited time offer!',
  image: '/products/widget.jpg',
  price: 99.99,
  salePrice: 79.99, // 20% off
  badge: { text: '-20%', variant: 'sale' },
  stock: 5, // Low stock warning
};

<ProductCard
  product={saleProduct}
  // Shows:
  // - Strikethrough on original price
  // - Red sale price
  // - "-20%" badge
  // - "Only 5 left" warning
/>
```

### New Arrivals

```tsx
const newProduct = {
  id: '2',
  name: 'Latest Widget',
  description: 'Just launched!',
  image: '/products/new-widget.jpg',
  price: 149.99,
  badge: { text: 'NEW', variant: 'new' },
};

<ProductCard
  product={newProduct}
  // Shows "NEW" badge in green
/>
```

### Out of Stock

```tsx
const outOfStockProduct = {
  id: '3',
  name: 'Popular Widget',
  description: 'Back in stock soon',
  image: '/products/widget-sold-out.jpg',
  price: 89.99,
  stock: 0,
};

<ProductCard
  product={outOfStockProduct}
  // Add to cart button disabled
  // Shows "Out of Stock" badge
/>
```

## Shopping Cart

Full cart interface with quantity management.

### Basic Usage

```tsx
import { ShoppingCart } from '@/components/ui/shopping-cart';

const [cartItems, setCartItems] = useState<CartItem[]>([
  {
    id: '1',
    productId: 'prod-1',
    name: 'Premium Widget',
    image: '/products/widget.jpg',
    price: 79.99,
    quantity: 2,
    variant: 'Blue / Large',
    maxQuantity: 10,
  },
]);

<ShoppingCart
  items={cartItems}
  onUpdateQuantity={(itemId, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }}
  onRemoveItem={(itemId) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  }}
  onCheckout={() => router.push('/checkout')}
  onContinueShopping={() => router.push('/products')}
  tax={15.99}
  shipping={10.00}
  currency="USD"
  variant="sidebar"
/>
```

### Props

```typescript
interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string; // e.g., "Blue / Large"
  maxQuantity?: number; // Show warning at 80%
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onApplyPromo?: (code: string) => Promise<{ discount: number }>;
  subtotal?: number; // Auto-calculated if not provided
  tax?: number;
  shipping?: number;
  discount?: number;
  currency?: string; // Default: 'USD'
  variant?: 'sidebar' | 'page'; // Default: 'sidebar'
  className?: string;
}
```

### Sidebar Variant

```tsx
// Fixed right sidebar
<ShoppingCart
  items={cartItems}
  variant="sidebar"
  // Appears as fixed panel on right side
  // Ideal for quick access without leaving page
/>
```

### Page Variant

```tsx
// Full cart page
<ShoppingCart
  items={cartItems}
  variant="page"
  // Centered layout
  // Ideal for dedicated cart page
/>
```

### With Promo Codes

```tsx
<ShoppingCart
  items={cartItems}
  onApplyPromo={async (code) => {
    // Validate promo code
    const response = await fetch('/api/promo/validate', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });

    const { discount } = await response.json();
    return { discount };
  }}
  discount={discount}
/>
```

### Cart Context

```tsx
// contexts/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
```

## Checkout Form

Multi-step checkout with validation.

### Basic Usage

```tsx
import { CheckoutForm } from '@/components/ui/checkout-form';

<CheckoutForm
  cartTotal={299.97}
  currency="USD"
  onSubmit={async (data) => {
    // Process order
    const order = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (order.ok) {
      router.push('/order-confirmation');
    }
  }}
  onStepChange={(step) => {
    console.log('Current step:', step);
    // Track analytics
  }}
  showOrderSummary={true}
/>
```

### Props

```typescript
interface CheckoutFormData {
  shipping: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billing: {
    sameAsShipping: boolean;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  payment: {
    method: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    saveCard?: boolean;
  };
}

interface CheckoutFormProps {
  cartTotal: number;
  currency?: string;
  onSubmit?: (data: CheckoutFormData) => Promise<void>;
  onStepChange?: (step: number) => void;
  initialData?: Partial<CheckoutFormData>;
  showOrderSummary?: boolean; // Default: true
  className?: string;
}
```

### Full Checkout Page

```tsx
export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async (data: CheckoutFormData) => {
    try {
      // Create order
      const order = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          ...data,
          total,
        }),
      });

      const { orderId } = await order.json();

      // Clear cart
      clearCart();

      // Redirect to confirmation
      router.push(`/orders/${orderId}/confirmation`);
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-black mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push('/products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-black mb-8">Checkout</h1>
      <CheckoutForm
        cartTotal={total}
        currency="USD"
        onSubmit={handleCheckout}
        showOrderSummary={true}
      />
    </div>
  );
}
```

### With Stripe Integration

```tsx
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function CheckoutPage() {
  const handleCheckout = async (data: CheckoutFormData) => {
    // Create Stripe checkout session
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        shipping: data.shipping,
        billing: data.billing,
      }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <CheckoutForm
      cartTotal={total}
      currency="USD"
      onSubmit={handleCheckout}
    />
  );
}
```

## Complete E-commerce Flow

### 1. Product Listing Page

```tsx
// app/products/page.tsx
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-black mb-8">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(product) => {
              addItem({
                id: crypto.randomUUID(),
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.salePrice || product.price,
                quantity: 1,
              });
              toast.success(`${product.name} added to cart`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

### 2. Cart Sidebar (Layout Component)

```tsx
// app/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  const { items, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  return (
    <html>
      <body>
        <Navbar />

        {children}

        {items.length > 0 && (
          <ShoppingCart
            items={items}
            variant="sidebar"
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={() => router.push('/checkout')}
            onContinueShopping={() => router.push('/products')}
          />
        )}
      </body>
    </html>
  );
}
```

### 3. Checkout Page

```tsx
// app/checkout/page.tsx
export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  return (
    <div className="container mx-auto py-12">
      <CheckoutForm
        cartTotal={total}
        onSubmit={async (data) => {
          const order = await createOrder({ items, ...data });
          clearCart();
          router.push(`/orders/${order.id}/confirmation`);
        }}
      />
    </div>
  );
}
```

### 4. Order Confirmation

```tsx
// app/orders/[id]/confirmation/page.tsx
export default function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder(params.id).then(setOrder);
  }, [params.id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-success/20 p-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <div>
              <CardTitle>Order Confirmed!</CardTitle>
              <p className="text-sm text-muted-foreground">
                Order #{order.id}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Shipping Address</h3>
              <p className="text-sm text-muted-foreground">
                {order.shipping.fullName}<br />
                {order.shipping.address}<br />
                {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Order Items</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span className="font-bold">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-black">
                <span>Total</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Validation Examples

### Email Validation

```tsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string) => {
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};
```

### Postal Code Validation

```tsx
const postalCodeRegex = /^\d{5}(-\d{4})?$/; // US format

const validatePostalCode = (code: string, country: string) => {
  if (!code) return 'Postal code is required';

  if (country === 'US' && !postalCodeRegex.test(code)) {
    return 'Invalid US postal code (12345 or 12345-6789)';
  }

  return null;
};
```

### Card Number Validation

```tsx
const validateCardNumber = (number: string) => {
  const cleaned = number.replace(/\s/g, '');

  if (cleaned.length < 13 || cleaned.length > 19) {
    return 'Invalid card number length';
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0 ? null : 'Invalid card number';
};
```

## Analytics Integration

### Track Add to Cart

```tsx
const addToCart = (product: Product) => {
  // Add to cart
  cart.addItem(product);

  // Track analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1,
      }],
    });
  }
};
```

### Track Checkout Steps

```tsx
const handleStepChange = (step: number) => {
  const stepNames = ['shipping', 'payment', 'review'];

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'checkout_progress', {
      checkout_step: step + 1,
      checkout_option: stepNames[step],
    });
  }
};
```

### Track Purchase

```tsx
const handleCheckoutComplete = (order: Order) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: 'USD',
      tax: order.tax,
      shipping: order.shipping,
      items: order.items.map((item) => ({
        item_id: item.productId,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }
};
```

## SEO for Product Pages

```tsx
// app/products/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.slug);

  return {
    title: `${product.name} - ${product.price} | Your Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}
```

## Performance Tips

1. **Image Optimization**: Use Next.js `<Image>` component
2. **Lazy Load Images**: Products below the fold
3. **Prefetch Cart Data**: On hover/focus
4. **Debounce Quantity Updates**: Prevent API spam
5. **Optimistic UI**: Update cart immediately

```tsx
// Optimistic cart update
const updateQuantity = async (itemId: string, quantity: number) => {
  // Update UI immediately
  setCartItems((items) =>
    items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    )
  );

  // Sync with server (fire and forget)
  fetch('/api/cart/update', {
    method: 'POST',
    body: JSON.stringify({ itemId, quantity }),
  }).catch((error) => {
    // Revert on error
    console.error('Failed to update cart:', error);
  });
};
```

---

**Next Steps:**
- View [Component Library README](../COMPONENT-LIBRARY-README.md)
- Check [Charts Guide](./CHARTS-GUIDE.md)
- Explore [Communication Guide](./COMMUNICATION-GUIDE.md)
