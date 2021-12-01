import {useRouter} from 'next/Router'
import Head from 'next/head'
export default function Car({car}) {
    const router = useRouter()
    const {id} = router.query
    return (
        <div>
            <h1>Car {id}</h1>
            <p>This is the car {id}</p>
            <p>This is the color of the car {car.color}</p>
        </div>
    )

}
// export async function getServerSideProps({ params }) {
//     const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     const data = await req.json();

//     return {
//         props: { car: data },
//     }
// }

export async function getStaticProps({ params }) {

    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data },
    }
}

export async function getStaticPaths() {

    const req = await fetch('http://localhost:3000/cars.json');
    const data = await req.json();

    const paths = data.map(car => {
        return { params: { id: car } }
    })

    return {
        paths,
        fallback: false
    };
}