"use client"

import { NextUIProvider } from '@nextui-org/react';
import { FC, ReactNode } from 'react';

type UiProviderProps = {
    children: ReactNode
}

export const UIProvider: FC<UiProviderProps> = ({ children }) => {
    return <NextUIProvider>{children}</NextUIProvider>
}