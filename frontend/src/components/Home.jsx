import Card from "./Card.jsx";
import './Home.css'

export default function Home(){

    return (
        <>
            <Card categoria={"processor"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"otherboard"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"cpu-cooler"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"case"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"graphics-card"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"ram"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"storage"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"case-cooler"} descrizione={"La CPU è ...."}></Card>
            <Card categoria={"power-supply"} descrizione={"La CPU è ...."}></Card>
        </>
    )

}