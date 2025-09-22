interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayClass {
  new (options: RazorpayOptions): {
    open: () => void;
  };
}

export const initializeRazorpay = (): Promise<RazorpayClass | null> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const Razorpay = (window as any).Razorpay;
      if (Razorpay) {
        resolve(Razorpay);
      } else {
        resolve(null);
      }
    };
    script.onerror = () => {
      resolve(null);
    };
    document.body.appendChild(script);
  });
};