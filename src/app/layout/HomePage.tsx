export default function HomePage() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(/783289.webp)`,
          width: '190vh',
          height: '90vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          margin: '-10px',
        }}
      >
        <h1 className='p-5'>Let's make impact together</h1>
        <div
          className='bg-body-tertiary rounded m-5 p-5'
          style={{
            width: '15rem',
            backgroundImage: `url(/bottle.avif)`,
            backgroundSize: '30vh',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'right 35% bottom 0%'
          }}
        >
          <h1>350 million</h1>
          <h5>tons of plastic waste is produced every year</h5>
        </div>
      </div>
    </>
  )
}
