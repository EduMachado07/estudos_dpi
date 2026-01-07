import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { useLoginModel } from "./login.model";
import { NavLink } from "react-router";
import { LoaderCircle } from "lucide-react";

type LoginViewProps = ReturnType<typeof useLoginModel>;

export const LoginView = (props: LoginViewProps) => {
  const { form, onSubmit, apiError, status } = props;

  return (
    <>
      <main className="md:w-full h-screen flex justify-center items-center">
        <section className="w-full px-[4vw] md:px-[4vw] lg:w-1/4 lg:px-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6"
            >
              <NavLink
                to="/"
                className="font-title md:text-xl text-lg flex items-center gap-0 absolute top-6 lg:left-[8vw] left-[4vw]"
              >
                <div className="w-14 h-14">
                  <img
                    src="/logo_dpi.png"
                    alt="Logo DPI"
                    className="w-full object-cover"
                  />
                </div>
                Estudos DPI
              </NavLink>
              <h1 className="font-title text-2xl">Login</h1>
              {apiError && (
                <p className="text-red-500 text-sm font-medium text-wrap">
                  {apiError}
                </p>
              )}
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={status === "pending"}>
                {status === "pending" ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Entrar"
                )}
              </Button>
              <hr />
              <p className="self-center font-body-medium">
                Disponível apenas para pessoas autorizadas
              </p>
            </form>
          </Form>
        </section>
      </main>
    </>
  );
};
