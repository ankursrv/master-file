import React from "react"
import CustomImage from "@/components/molecules/customImage"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-center bg-black/60 gap-7 py-4">
        <div className="w-[180px] h-[43px]">
          <CustomImage
            src="/images/rocksport-b2b-images/header/header-logo.png"
            width={1000}
            height={1000}
            alt="rocksport logo"
            className="responsive-image-contain"
          />
        </div>
        <div className="w-[31px]">
          <CustomImage
            src="/images/rocksport-b2b-images/header/output-onlinepngtools.png"
            width={1000}
            height={1000}
            alt="rocksport logo"
            className="responsive-image-cover"
          />
        </div>        
        <div className="w-[71px] h-[69px]">
          <CustomImage
            src="/images/rocksport-b2b-images/header/image1.png"
            width={1000}
            height={1000}
            alt="rocksport logo"
            className="responsive-image-cover"
          />
        </div>        
      </nav>
    </header>
  )
}

export default Header
