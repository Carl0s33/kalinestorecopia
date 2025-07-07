// Componente de grupo de rádio reutilizável e acessível
// Utiliza @radix-ui/react-radio-group para acessibilidade.

import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utilitarios';

// Componente raiz que agrupa os itens
const GrupoRadio = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn('flex gap-2', className)}
    {...props}
  />
));
GrupoRadio.displayName = RadioGroupPrimitive.Root.displayName;

// Cada opção de rádio (ex.: tamanho "38")
const ItemGrupoRadio = React.forwardRef(
  ({ className, children, value, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      aria-label={value}
      className={cn(
        // layout
        'px-2 py-1 min-w-[2.5rem] text-center text-sm font-medium rounded-md',
        'border border-primary ring-offset-background select-none',
        // estados
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'data-[state=unchecked]:bg-background data-[state=unchecked]:text-primary',
        // acessibilidade
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children ?? value}
    </RadioGroupPrimitive.Item>
  )
);
ItemGrupoRadio.displayName = RadioGroupPrimitive.Item.displayName;

export { GrupoRadio, ItemGrupoRadio };