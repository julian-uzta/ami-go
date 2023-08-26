import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center pt-16">
      <div className="hero bg-base-200">
        <div className="hero-content flex flex-col text-center w-full">
          <div className="pb-4">
            <img src="logo_ami-go.png" alt="Logo amiGO"></img>
          </div>
          <div className="w-1/2 py-6">
            <h1 className="text-2xl font-bold pb-4">¡Bienvenido a tu nueva forma de viajar favorita!</h1>
            <p className="py-2">Crea conexiones genuinas con personas que desean compartir experiencias de viaje memorables sin ningún compromiso romántico.</p>
            <p className="py-2">Comienza a explorar la emocionante comunidad de viajeros que esperan conocerte y embarcarse en aventuras increíbles contigo.</p>
            <p className="py-2">¡Que empiece la búsqueda de tu compañero de viaje perfecto!</p>
          </div>
          <div className="carousel rounded-box h-1/3">
            <div className="carousel-item">
              <img width="240px" height="120px" src="carousel/landing/image_1.jpg" alt="First carousel image" />
            </div> 
            <div className="carousel-item">
              <img width="240px" height="120px" src="carousel/landing/image_2.jpg" alt="Second carousel image" />
            </div> 
            <div className="carousel-item">
              <img width="240px" height="120px" src="carousel/landing/image_3.jpg" alt="Third carousel image" />
            </div> 
          </div>
          <Link href="/begin">
            <button className="btn btn-secondary my-8">Comienza a explorar</button>
          </Link>
        </div>
      </div>      
    </div>
  )
}
