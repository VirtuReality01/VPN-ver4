"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StatusCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
  onPress?: () => void
  rightIcon?: ReactNode
  onRightIconPress?: () => void
  disabled?: boolean
}

export default function StatusCard({
  title,
  icon,
  children,
  onPress,
  rightIcon,
  onRightIconPress,
  disabled = false,
}: StatusCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>

        {rightIcon && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRightIconPress}>
            {rightIcon}
          </Button>
        )}
      </CardHeader>

      <CardContent className="pt-2 pb-4">
        {children}

        {onPress && (
          <Button
            variant="secondary"
            className={cn("w-full mt-4 text-sm", disabled && "opacity-50 cursor-not-allowed")}
            onClick={onPress}
            disabled={disabled}
          >
            {title === "Connection Details" ? "Change Server" : "View Details"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

