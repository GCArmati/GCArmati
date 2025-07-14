import Card from "../components/Card.jsx";
import './Home.css'

export default function Home(){

    return (
        <>
            <Card categoria={"Processor"}></Card>
            <Card categoria={"Motherboard"}></Card>
            <Card categoria={"CPU Cooler"}></Card>
            <Card categoria={"Case"}></Card>
            <Card categoria={"Graphics Card"}></Card>
            <Card categoria={"RAM"}></Card>
            <Card categoria={"Storage"}></Card>
            <Card categoria={"Case Cooler"}></Card>
            <Card categoria={"Power Supply"}></Card>
        </>
    )

}