import { Button } from '../ui/button'
import { MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from 'react'

function ActionButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    View Analysis
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Download Report
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Compare Report
                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-600">
                    Delete Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionButton
