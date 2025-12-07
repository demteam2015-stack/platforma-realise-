'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a sheet name based on the content of the sheet.
 *
 * - generateSheetName - A function that takes the content of a sheet and returns a suggested name for it.
 * - GenerateSheetNameInput - The input type for the generateSheetName function.
 * - GenerateSheetNameOutput - The return type for the generateSheetName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSheetNameInputSchema = z.object({
  content: z.string().describe('The content of the sheet.'),
});
export type GenerateSheetNameInput = z.infer<typeof GenerateSheetNameInputSchema>;

const GenerateSheetNameOutputSchema = z.object({
  sheetName: z.string().describe('A suggested name for the sheet based on its content.'),
});
export type GenerateSheetNameOutput = z.infer<typeof GenerateSheetNameOutputSchema>;

export async function generateSheetName(input: GenerateSheetNameInput): Promise<GenerateSheetNameOutput> {
  return generateSheetNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSheetNamePrompt',
  input: {schema: GenerateSheetNameInputSchema},
  output: {schema: GenerateSheetNameOutputSchema},
  prompt: `You are an expert at naming sheets based on their content.

  Given the following content of a sheet, suggest a concise and relevant name for it.

  Content:
  {{{content}}}

  Name:`,
});

const generateSheetNameFlow = ai.defineFlow(
  {
    name: 'generateSheetNameFlow',
    inputSchema: GenerateSheetNameInputSchema,
    outputSchema: GenerateSheetNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
