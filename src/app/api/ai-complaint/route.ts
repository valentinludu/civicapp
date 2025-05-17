import { schema } from "@/components/Complaint/home.schema";
import { handleMessage } from "@/lib/agent";
import { emails } from "@/lib/emails";

const createMessage = (
  name: string,
  residenceAddress: string,
  address: string,
  description: string,
  sectorNo: string,
  photos: { id: string; url: string }[],
  phone?: string
) => {
  const institution = emails[sectorNo];
  const photosString = photos
    .filter((photo) => !!photo.url)
    .map((photo) => photo.url)
    .join("\n");
  return `
    Esti un asistent de scrisori care poate ajuta oamenii cu problemele lor, scriind plangeri pentru primarie.
    Vei returna in format JSON urmatoarele date:
    {
      "subject": "string",
      "message": "string",
      "email": "string",
      "valid": "boolean"
    }
      Exemplu:
      {
        "subject": "Masina parcata pe loc public pe ${address}",
        "message": "Buna ziua, sunt Ion Popescu, iar pe strada Ialomitei 39, sector 2, a fost parcata o masina pe loc public.",
        "email": "${institution}",
        "valid": true
      }
    Avand variabilele urmatoare vei ajuta utilizatorul sa scrie plangerea pentru primarie;
    nume: ${name}
    adresaDeAcasa: ${residenceAddress}
    adresaProblemei: ${address}
    descriereaProblemei: ${description}
    phone: ${phone} (doar daca exista)
  

    Daca problema nu este valida, seteaza variabila valid ca fiind false si message ca fiind "Problema nu este valida", si ignora formatul mesajului. Problemele sunt valide doar daca sunt legate de primaria de sector a Bucurestiului.

    Dupa terminarea mesajului nu mai adauga nimic altceva.

    Daca problema este valida, formatul mesajului ar trebui sa fie asa:

    Buna ziua, 

    Va aduc la cunoștință [descrierea problemei pe lung explicata de tine] de pe [adresaProblemei]. 

    Vă rog să inițiați demersurile necesare pentru [Actiunea pe care ne dorim sa o ia primaria]

    ${
      !!photosString.trim()
        ? `Am atasat cateva imagini cu problema: \n ${photosString}`
        : ""
    }

    Aștept un răspuns cu numărul de înregistrare al sesizării. 

    Multumesc!
    Nume: ${name}
    ${residenceAddress ? "Adresa de domiciliu: " + residenceAddress : ""}
    ${phone ? "Telefon: " + phone : ""}
    `;
};

export async function POST(req: Request) {
  const body = await req.json();
  const data = schema.parse(body);

  const { description, fullName, address, phone, residenceAddress, photos } =
    data;

  const sector = address.split(",").at(-1)?.trim();
  const sectorNo = sector?.split(" ").at(1);

  if (!sectorNo) {
    return new Response("Invalid address. Sector could not be found", {
      status: 400,
    });
  }

  const resp = await handleMessage(
    createMessage(
      fullName,
      residenceAddress,
      address,
      description,
      sectorNo,
      photos,
      phone
    )
  );

  if (!resp) {
    return new Response("Error generating complaint", {
      status: 400,
    });
  }

  if (!resp.valid) {
    return new Response("Problema nu este valida", {
      status: 400,
    });
  }

  return Response.json(resp);
}
