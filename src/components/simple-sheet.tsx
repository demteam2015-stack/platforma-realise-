"use client";

import { useState, useRef, useTransition, useEffect } from "react";
import { Bold, Italic, Underline, Wand2, Loader2 } from "lucide-react";
import { generateSheetName } from "@/ai/flows/generate-sheet-name";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function SimpleSheet() {
  const [sheetName, setSheetName] = useState("Untitled Sheet");
  const [content, setContent] = useState("<p>Start typing here...</p>");
  const editorRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  const handleGenerateName = () => {
    startTransition(async () => {
      if (!editorRef.current || !editorRef.current.innerText.trim()) {
        toast({
          title: "Sheet is empty",
          description: "Please add some content before generating a name.",
          variant: "destructive",
        });
        return;
      }

      try {
        const plainText = editorRef.current.innerText;
        const result = await generateSheetName(plainText);
        if (result.sheetName) {
          setSheetName(result.sheetName);
          toast({
            title: "Sheet name generated!",
            description: `We've named your sheet: "${result.sheetName}"`,
          });
        }
      } catch (error) {
        console.error("Failed to generate sheet name:", error);
        toast({
          title: "Error",
          description: "Failed to generate a name for the sheet.",
          variant: "destructive",
        });
      }
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden animate-fade-in">
      <CardHeader className="p-4 sm:p-6 bg-card">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            className="text-2xl font-bold flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto bg-transparent"
            placeholder="Untitled Sheet"
            aria-label="Sheet Name"
          />
          <Button onClick={handleGenerateName} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Name
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <div className="flex items-center gap-1 p-2 border-b bg-card/95 backdrop-blur-sm sticky top-0 z-10">
        <Button variant="ghost" size="icon" title="Bold" aria-label="Bold" onMouseDown={(e) => { e.preventDefault(); handleFormat("bold"); }}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Italic" aria-label="Italic" onMouseDown={(e) => { e.preventDefault(); handleFormat("italic"); }}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Underline" aria-label="Underline" onMouseDown={(e) => { e.preventDefault(); handleFormat("underline"); }}>
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-0">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={handleContentChange}
          className="w-full min-h-[60vh] p-6 sm:p-8 md:p-10 focus:outline-none leading-relaxed tracking-wide text-base"
          dangerouslySetInnerHTML={{ __html: content }}
          role="textbox"
          aria-multiline="true"
        />
      </CardContent>
    </Card>
  );
}
