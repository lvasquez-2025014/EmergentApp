from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Sanctum Marmoris API"}

# ========== ENDPOINTS POR VISTA ==========

@api_router.get("/inicio")
async def get_inicio():
    """Datos para la página de inicio / hero"""
    return {
        "studio_name": "Sanctum Marmoris",
        "tagline": "Donde la piedra guarda el silencio de lo eterno",
        "founded": "MMXII",
        "specialty": "Taller de imaginería sacra",
        "description": "Imaginería religiosa tallada a mano para coleccionistas, parroquias y casas devocionales.",
        "cta_primary": "Explorar el catálogo",
        "cta_secondary": "Conocer el manifiesto",
        "marquee_text": [
            "Mármol de Carrara",
            "Piedra arenisca",
            "Bronce sacro",
            "Pan de oro 24k",
            "Mosaico bizantino",
            "Talla directa"
        ]
    }

@api_router.get("/catalogo")
async def get_catalogo():
    """Datos para la página de catálogo"""
    return {
        "title": "Obras vivas en piedra",
        "subtitle": "Cuatro piezas seleccionadas del fondo permanente. Cada una es una conversación entre el cincel, la materia y el silencio.",
        "works": [
            {
                "id": "christ-corona",
                "number": "I",
                "title": "Christus Patiens",
                "subtitle": "Corona de Espinas",
                "medium": "Mármol de Carrara · Talla manual",
                "year": "MMXXIV",
                "dimensions": "62 × 40 × 38 cm",
                "status": "Disponible",
                "description": "Busto monumental tallado en mármol blanco, evocando la Pasión a través de la corona de espinas. Inspirado en la tradición lapidaria romana del siglo XVI."
            },
            {
                "id": "virgo-aurea",
                "number": "II",
                "title": "Virgo Aurea",
                "subtitle": "Madonna Bizantina",
                "medium": "Mosaico dorado · Pan de oro 24k",
                "year": "MMXXIV",
                "dimensions": "120 × 80 cm",
                "status": "Encargo",
                "description": "Virgen María en composición bizantina sobre fondo de oro. Cada teselas se asienta a mano siguiendo la técnica ravennate del siglo VI."
            },
            {
                "id": "passio-magna",
                "number": "III",
                "title": "Passio Magna",
                "subtitle": "Cristo Detallado",
                "medium": "Piedra arenisca · Pátina antigua",
                "year": "MMXXIII",
                "dimensions": "180 × 60 × 45 cm",
                "status": "Colección privada",
                "description": "Talla en piedra arenisca con pátina envejecida que captura el dolor sublimado de la Pasión. Las marcas del cincel permanecen visibles."
            },
            {
                "id": "domus-dei",
                "number": "IV",
                "title": "Domus Dei",
                "subtitle": "Atrio Ortodoxo",
                "medium": "Impresión museo · Edición limitada",
                "year": "MMXXV",
                "dimensions": "100 × 150 cm",
                "status": "Edición limitada",
                "description": "Fotografía monumental de un interior ortodoxo, impresa sobre papel de algodón Hahnemühle. Edición numerada y firmada de 12 piezas."
            }
        ],
        "process": {
            "title": "Proceso",
            "steps": [
                {
                    "title": "Desde la piedra",
                    "description": "Cada obra comienza con la selección meticulosa de la materia prima. Visitamos canteras históricas en Carrara, Volterra y Macael para encontrar la piedra perfecta para cada proyecto."
                },
                {
                    "title": "Manos maestras",
                    "description": "Nuestros maestros talladores provienen de linajes de artesanos con siglos de tradición. Cada gesto del cincel está impregnado de conocimiento ancestral."
                },
                {
                    "title": "Envío sagrado",
                    "description": "Las obras se transportan en empaques especiales diseñados para proteger la integridad de la pieza. Incluimos certificado de autenticidad y documentación de procedencia."
                }
            ]
        }
    }

@api_router.get("/manifiesto")
async def get_manifiesto():
    """Datos para la página de manifiesto"""
    return {
        "title": "Tres principios inquebrantables",
        "principles": [
            {
                "num": "I",
                "title": "Materia",
                "body": "Trabajamos exclusivamente con mármol, piedra arenisca, bronce y pan de oro de procedencia certificada. La materia es liturgia."
            },
            {
                "num": "II",
                "title": "Tiempo",
                "body": "Cada obra requiere de 200 a 1.400 horas de trabajo manual. Rechazamos la producción seriada como traición al oficio."
            },
            {
                "num": "III",
                "title": "Silencio",
                "body": "Nuestros talleres operan en silencio. La sacralidad exige el recogimiento del artesano antes que la prisa del mercado."
            }
        ],
        "history": {
            "title": "Doce años de devoción",
            "founded": "MMXII",
            "story": "Fundado en MMXII, Sanctum Marmoris nació de la unión de tres familias de artesanos: los Bianchi de Carrara, maestros del mármol; los Navarro de Toledo, herederos de la tradición damasquina; y los Petrov de Sofía, iconógrafos de la escuela bizantina.",
            "location": "Nuestro taller principal se encuentra en las afueras de Florencia, en una antigua capilla del siglo XIV que convertimos en santuario de la escultura sagrada. Allí, bajo la luz que filtran las rosas de ojiva, nacen nuestras obras."
        },
        "stats": [
            { "num": "MMXII", "label": "Año de fundación" },
            { "num": "184", "label": "Obras catalogadas" },
            { "num": "27", "label": "Maestros artesanos" },
            { "num": "IX", "label": "Países de exportación" }
        ]
    }

@api_router.get("/encargo")
async def get_encargo():
    """Datos para la página de encargo / contacto"""
    return {
        "title": "Encarga una obra única",
        "subtitle": "Cada solicitud se atiende personalmente por nuestra dirección artística. Tiempo de respuesta: 48 horas.",
        "contact": {
            "address": {
                "street": "Via della Pietra Sacra, 42",
                "city": "50014 Fiesole (FI)",
                "country": "Italia"
            },
            "email": "info@sanctummarmoris.com",
            "phone": "+39 055 789 2341",
            "hours": "Lun-Vie: 9:00 - 18:00 CET"
        },
        "visit_policy": {
            "title": "Visitas",
            "description": "Con cita previa. Recibimos coleccionistas y comisiones previa solicitud.",
            "note": "No tenemos showroom al público"
        },
        "quote": {
            "text": "Cada obra que sale de nuestro taller lleva consigo no solo la mano del artesano, sino la oración silenciosa de quien la recibirá.",
            "author": "Marco Bianchi",
            "role": "Director Artístico"
        },
        "form_fields": [
            { "name": "name", "label": "Nombre", "type": "text", "required": True },
            { "name": "email", "label": "Correo electrónico", "type": "email", "required": True },
            { "name": "interest", "label": "Interés", "type": "select", "options": ["Obra existente", "Encargo personalizado", "Consulta general"] },
            { "name": "message", "label": "Mensaje", "type": "textarea", "required": True }
        ]
    }

# ========== ENDPOINTS LEGACY (para compatibilidad) ==========

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()