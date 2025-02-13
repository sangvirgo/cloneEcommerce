import MainCarousel from "./HomeCarousel/MainCarousel"
import HomeSectionCarousel from "./HomeSectionCarousel/HomeSectionCarousel"

const HomePage = () => {
  return (
    <div>
        <div>
          <MainCarousel />
        </div>


        <div className="space-y-10 py-20 flex flex-col justify-center">
            <HomeSectionCarousel  />
            <HomeSectionCarousel  />
            <HomeSectionCarousel  />
        </div>
    </div>
  )
}

export default HomePage