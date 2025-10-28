import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface UserRegistration {
  full_name: string;
  cpf: string;
  email: string;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { userData } = await req.json() as { userData: UserRegistration };

    if (!userData || !userData.full_name || !userData.cpf || !userData.email) {
      return new Response(
        JSON.stringify({ success: false, error: "Dados incompletos" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const GOOGLE_SCRIPT_URL = Deno.env.get("GOOGLE_SHEETS_SCRIPT_URL");

    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SHEETS_SCRIPT_URL não configurada");
      return new Response(
        JSON.stringify({ success: false, error: "Configuração ausente" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const dataCompleta = new Date(userData.created_at);
    const data = dataCompleta.toLocaleDateString("pt-BR");
    const hora = dataCompleta.toLocaleTimeString("pt-BR");

    const formattedData = {
      nome: userData.full_name,
      cpf: userData.cpf,
      email: userData.email,
      data: data,
      hora: hora,
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar para Google Sheets: ${response.statusText}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ success: true, result }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Erro ao processar:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});