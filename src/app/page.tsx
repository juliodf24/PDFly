'use client'
import { useState, useEffect } from 'react'
import GerarContrato from './contrato'
import { PDFViewer, DocumentProps } from '@react-pdf/renderer'
import type { ReactElement } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Copy } from "lucide-react";
import { pdf } from '@react-pdf/renderer';


const modeloExemplo = `{
  "titulo": "Nome do Documento",
  "questoes": [
    {
      "questao": "1 - Tema da questão",
      "pergunta": "Texto da pergunta aqui",
      "alternativas": ["A", "B", "C", "D"]
    }
  ],
  "gabarito": {
    "titulo": "Gabarito",
    "questoes": [
      {
        "questao": "1",
        "alternativas": ["A"]
      }
    ]
  }
}`;
export default function HomeDownload() {
  const [conteudo, setconteudo] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [ContractPDF, setContractPDF] = useState<ReactElement<DocumentProps> | null>(null)
  const [copiado, setCopiado] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState("");

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1000);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const generatePdf = async () => {
      if (ContractPDF) {
        const blob = await pdf(ContractPDF).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
      }
    };
    generatePdf();
  }, [ContractPDF]);



  const handleCopiarModelo = () => {
    navigator.clipboard.writeText(modeloExemplo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  const dados = {
    conteudo: conteudo,
  }

  useEffect(() => {
    if (submitted) {
      try {
        const contrato = GerarContrato(dados);
        setContractPDF(contrato);
      } catch (error) {
        alert("Envie o conteúdo seguindo o modelo correto.");
        window.location.reload();
      }

    }
  }, [submitted])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }



  return (
    <>
      <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL="https://ec2-18-206-187-99.compute-1.amazonaws.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.defer = true;
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: 'LESsJtCyLE4DSJmb9GfyXRkJ',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `,
          }}
        />
      {!submitted ? (
        <div className=" w-screen flex flex-col items-center justify-center">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt=""
            className='mt-10'
          />
          <Card className=" w-full max-w-[500px] mt-6 ">
            <CardHeader>
              <CardTitle className="text-xl">Gerar PDF</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Para gerar seu documento automaticamente, siga os passos:
                <ol className="list-decimal ml-4 mt-2 space-y-1">
                  <li>Peça para a IA gerar o conteúdo no seguinte formato:</li>
                  <div className="flex justify-end align-middle max-w-[90%]">
                    {copiado && (
                      <span className="text-xs text-[#108FFF] font-medium transition-opacity duration-200 self-center">
                        Copiado
                      </span>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopiarModelo}
                      className="px-2"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <pre className="bg-muted text-sm p-2 rounded-md overflow-x-auto mt-1 max-w-[90%]">
                    {modeloExemplo}
                  </pre>
                  <li>Copie e cole o conteúdo no campo abaixo.</li>
                </ol>
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  {/* <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="titulo">Titulo:</Label>
                      <Input 
                        required id="titulo" placeholder="Nome completo" type='text' 
                        onChange={(e) => setTitulo(e.target.value)}
                      />
                    </div> */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="conteudo">Conteudo:</Label>
                    <Textarea required id="conteudo" className='max-h-40 max-w-[100%]' placeholder="Cole aqui o conteudo segundo o modelo" onChange={(e) => setconteudo(e.target.value)}></Textarea>
                  </div>
                </div>

              </CardContent>
              <CardFooter className="flex  justify-end mt-5">
                <Button className='w-full cursor-pointer h-10 bg-[#108FFF]' type='submit'>Gerar Documento</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      ) : (
        <div style={{ height: '100vh' }}>
          {ContractPDF ? (
            isMobile ? (
              pdfBlobUrl ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <p className="text-center">Visualização não disponível em dispositivos móveis.</p>
                  <a
                    href={pdfBlobUrl}
                    download="documento.pdf"
                    className="bg-[#108FFF] text-white px-4 py-2 rounded-md"
                  >
                    Baixar PDF
                  </a>
                </div>
              ) : (
                <p className="text-center">Preparando o download...</p>
              )
            ) : (
              <PDFViewer width="100%" height="100%">
                {ContractPDF}
              </PDFViewer>
            )
          ) : (
            <p className="text-center">Carregando...</p>
          )}

        </div>
      )}
    </>
  )
}
