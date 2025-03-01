import { mens_kurta } from "./Data/mens_kurta"
import MainCarousel from "./HomeCarousel/MainCarousel"
import HomeSectionCarousel from "./HomeSectionCarousel/HomeSectionCarousel"

const HomePage = () => {
  return (
    <div>
        <div>
          <MainCarousel />
        </div>


        <div className="space-y-10 py-20 flex flex-col justify-center">
            <HomeSectionCarousel data={mens_kurta} sectionName={"Men's clothing"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Women's clothing"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Mix clothing"} />
        </div>
    </div>
  )
}

export default HomePage