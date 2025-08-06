import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"

interface NewFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onCreate: () => void
  loading?: boolean
}

export function NewFormDialog({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange, 
  onCreate, 
  loading = false 
}: NewFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogTitle>New Form</DialogTitle>
        <div className="space-y-4">
          <div>
            <Label>Form Title</Label>
            <Input 
              value={title} 
              onChange={e => onTitleChange(e.target.value)}
              placeholder="Enter form title"
            />
          </div>
          <div>
            <Label>Description (Optional)</Label>
            <Textarea 
              value={description} 
              onChange={e => onDescriptionChange(e.target.value)}
              placeholder="Enter form description"
              rows={3}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={onCreate} 
            disabled={!title.trim() || loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
