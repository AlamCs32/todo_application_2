import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'

const DatePicker = ({
    isPopoverOpen, setIsPopoverOpen, selectedRange, tempRange, onTempDateSelectHandler, onClearDateFilter, onApplyDateFilter
}) => {
    return (
        < Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} >
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px]">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {selectedRange.from
                        ? `${format(selectedRange.from, "yyyy-MM-dd")} → ${selectedRange.to ? format(selectedRange.to, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")}`
                        : "Pick Date Range"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
                <Calendar mode="range" selected={tempRange} onSelect={onTempDateSelectHandler} />
                <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" onClick={onClearDateFilter}>
                        Clear
                    </Button>
                    <Button onClick={onApplyDateFilter}>
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </ Popover>
    )
}

export default DatePicker