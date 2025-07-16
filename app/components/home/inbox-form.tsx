import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import {Textarea} from "~/components/ui/textarea";

export default function VolunteerFormPage() {
    return (
        <div className="w-full px-8 py-10 flex justify-center">
            <div className="w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground gap-y-1">
                        由 NYCU SDC 行政組 張貼
                        <div>2025 年 8 月 15 日（五）23:59 截止</div>
                    </div>
                    <h1 className="text-2xl font-semibold">請填寫 SDC 志工制服尺寸與飲食需求</h1>
                    <p className="text-sm text-muted-foreground">
                        為了統一製作制服與安排餐點，請填寫以下資訊。若有特殊需求請於下方備註欄說明。
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">姓名</Label>
                        <Input id="name" placeholder="請輸入您的姓名" />
                    </div>

                    <div className="space-y-2">
                        <Label>制服尺寸</Label>
                        <RadioGroup defaultValue="M" className="flex flex-wrap gap-4">
                            {["XS", "S", "M", "L", "XL", "2XL", "其他"].map((size) => (
                                <div key={size} className="flex items-center space-x-2">
                                    <RadioGroupItem value={size} id={`size-${size}`} />
                                    <Label htmlFor={`size-${size}`}>{size}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label>飲食需求</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="請選擇您的飲食需求" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">葷食</SelectItem>
                                <SelectItem value="vegetarian">素食</SelectItem>
                                <SelectItem value="allergy">特殊過敏需求</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="note">備註（選填）</Label>
                        <Textarea id="note" placeholder="如有其他需求可填寫於此" />
                    </div>
                </div>
            </div>
        </div>
    )
}
