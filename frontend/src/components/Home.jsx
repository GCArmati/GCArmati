import Card from "./Card.jsx";
import './Home.css'

export default function Home(){

    return (
        <>
            <Card categoria={"processor"}></Card>
            <Card categoria={"otherboard"}></Card>
            <Card categoria={"cpu-cooler"}></Card>
            <Card categoria={"case"}></Card>
            <Card categoria={"graphics-card"}></Card>
            <Card categoria={"ram"}></Card>
            <Card categoria={"storage"}></Card>
            <Card categoria={"case-cooler"}></Card>
            <Card categoria={"power-supply"}></Card>
        </>
    )

}