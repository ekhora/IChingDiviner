import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/queryClient";
import { IChingConsultation, ConsultationResult } from "@/types/iching";
import { ichingConsultationSchema } from "@shared/schema";

interface ConsultationFormProps {
  onConsultationComplete: (result: ConsultationResult) => void;
}

export default function ConsultationForm({ onConsultationComplete }: ConsultationFormProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [numberOfDraws, setNumberOfDraws] = useState([3]);

  const form = useForm<IChingConsultation>({
    resolver: zodResolver(ichingConsultationSchema),
    defaultValues: {
      question: "",
      consultationDate: new Date().toISOString().split('T')[0],
      consultationTime: new Date().toTimeString().slice(0, 5),
      numberOfDraws: 3,
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: IChingConsultation) => {
      const response = await apiRequest("POST", "/api/consultation", data);
      return response.json();
    },
    onSuccess: (result: ConsultationResult) => {
      const drawText = result.numberOfDraws > 1 ? t('results.draws') : t('results.draw');
      toast({
        title: t('toast.consultationSuccess'),
        description: `${result.numberOfDraws} ${drawText} ${t('toast.consultationSuccessDesc')}`,
      });
      onConsultationComplete(result);
    },
    onError: (error: any) => {
      toast({
        title: t('toast.consultationError'),
        description: error.message || t('toast.consultationErrorDesc'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: IChingConsultation) => {
    consultationMutation.mutate({
      ...data,
      numberOfDraws: numberOfDraws[0],
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-glass shadow-2xl mb-8">
      <CardContent className="p-8">
        <h2 className="text-3xl font-serif font-semibold text-slate-800 mb-6 text-center">
          <i className="fas fa-scroll text-gold mr-3"></i>
          {t('form.title')}
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Question Input */}
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    {t('form.question')} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form.questionPlaceholder')}
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="consultationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      {t('form.date')}
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="consultationTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      {t('form.time')}
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Number of Draws */}
            <div>
              <FormLabel className="text-sm font-medium text-slate-700 mb-2 block">
                {t('form.numberOfDraws')}
              </FormLabel>
              <div className="flex items-center space-x-4">
                <Slider
                  value={numberOfDraws}
                  onValueChange={setNumberOfDraws}
                  max={100}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <span className="w-16 px-3 py-2 bg-slate-100 rounded text-center font-medium">
                  {numberOfDraws[0]}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {t('form.numberOfDrawsHelp')}
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full gradient-primary text-white py-4 text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              disabled={consultationMutation.isPending}
            >
              {consultationMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  {t('form.submitting')}
                </>
              ) : (
                <>
                  <i className="fas fa-magic mr-2"></i>
                  {t('form.submit')}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
