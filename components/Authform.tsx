"use client"
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { toast } from "sonner";
import { FormField } from "@/components/formfield";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signUp,signIn } from "@/lib/actions/auth.action";
type FormType = "sign-in" | "sign-up";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";

const AuthFormSchema = ({type}:{ type: FormType }) => {
    return z.object({
        name:type === "sign-up" ? z.string().min(2, "Name must be at least 2 characters") : z.string().optional(),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });
}
    
const AuthForm = ({ type }:{ type : FormType }) => {
    const router = useRouter();
  const formSchema = AuthFormSchema({type});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password: "",
    },
  });

async function onSubmit (values: z.infer<typeof formSchema>){
    try{
      if(type === "sign-up") {
        const {name,email,password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });
        if(!result?.success) {
          toast.error(result.message);
          return;
        }
        toast.success("Account created successfully!Please sign in.");
        router.push("/sign-in");
      } else {
        const {email,password} = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();
        if(!idToken) {
          toast.error("Failed to signin Please try again.");
          return;
        }
        await signIn({ email, idToken });
        toast.success("Signed in successfully!");
        router.push("/");
      }

      }catch (error) {
         toast.error("Something went wrong. Please try again.");
      }
    };
    const isSignin = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
          <h3> Practise for job interviews with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    {!isSignin && <FormField control={form.control} name="name" label="Name" placeholder="Your Name" />}
    <FormField control={form.control} name="email" label="Email" placeholder="Your Email" type="email" />
    <FormField control={form.control} name="password" label="Password" placeholder="Your Password" type="password" />
    <Button className="btn" type="submit">{!isSignin ? 'Sign up' : 'Sign in'}</Button>
          </form>
        </Form>
    <p className="test-center">
      {!isSignin ?  "Already have an account?" :"New to PrepWise? " }
      <Link href={!isSignin ? "/sign-in":"/sign-up"} className="text-primary-100 underline hover:text-primary-200 ml-1"> 
        {!isSignin ? "Sign in":"Create an account"}
        </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;