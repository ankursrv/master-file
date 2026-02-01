import React from "react"
import CustomImage from "@/components/molecules/customImage"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-center bg-black/60 gap-7 py-4">
        <div className="w-[180px] h-[43px]">
          <CustomImage
            src="/images/rocksport-b2b-images/header/header-logo.png"
            width={180}
            height={43}
            alt="Rocksport Logo"
            className="responsive-image-contain"
            priority
          />
        </div>
        <div className="w-[31px]">
          <CustomImage
            src="/images/rocksport-b2b-images/header/output-onlinepngtools.png"
            width={31}
            height={31}
            alt=""
            className="responsive-image-cover"
            priority
          />
        </div>
        <div className="w-[71px] h-[69px]">
          <CustomImage
            src="/images/rocksport-b2b-images/header/image1.png"
            width={71}
            height={69}
            alt=""
            className="responsive-image-cover"
            priority
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
