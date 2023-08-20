import { Container, Spinner } from "react-bootstrap"

export default function LoadingComponent(){
    return <>
    <Container>
        <Spinner animation="grow" variant="success"/>
    </Container>
    </>
}