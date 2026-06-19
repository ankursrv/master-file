import CustomImage from "@/components/molecules/customImage";
import SectionTitle from "@/components/molecules/sectionTitle";
import type {
  RepresentativeCard as RepCard,
  RepresentativeSection,
} from "@/types/adventure";

interface ReviewCardProps {
  sectionHeading?: RepresentativeSection["section_heading"];
  representativeCard?: RepCard;
}

const ReviewCard = ({
  sectionHeading,
  representativeCard,
}: ReviewCardProps) => {
  const title = sectionHeading?.title;
  const subTitle = sectionHeading?.sub_title;

  const image = representativeCard?.representative_image;
  const personName = representativeCard?.person_name;
  const personRole = representativeCard?.person_role;
  const bio = representativeCard?.representative_description;

  const hasSectionHeading = title || subTitle;
  const hasCardContent = image || personName || personRole || bio;

  if (!hasSectionHeading && !hasCardContent) return null;

  return (
    <section className="bg-image py-15 md:py-20">
      <div className="container">
        {hasSectionHeading && (
          <SectionTitle
            title={title!}
            heading={subTitle!}
            customClass="w-[211px] md:w-[540px]"
          />
        )}

        {hasCardContent && (
          <div className="flex items-center flex-col lg:flex-row gap-4 lg:gap-10 p-4 lg:p-8 mt-11 md:mt-15 bg-white border border-dark-100 rounded-lg">
            {image && personName && (
              <figure className="rounded-sm md:w-full h-[309px] lg:w-[474px] lg:h-[411px] overflow-hidden shrink-0">
                <CustomImage
                  src={image}
                  width={474}
                  height={411}
                  alt={personName}
                  className="responsive-image-cover"
                />
              </figure>
            )}

            {(bio || personName || personRole) && (
              <div>
                {bio && (
                  <p className="text-dark-200 text-center lg:text-start font-semibold leading-140 text-sm md:text-2xl">
                    {bio}
                  </p>
                )}

                {(personRole || personName) && (
                  <div className="text-center lg:text-start border-t border-light-100 pt-4 mt-4 lg:mt-20">
                    {personRole && (
                      <p className="text-dark-300/60 text-sm md:text-xl font-normal pb-2">
                        {personRole}
                      </p>
                    )}
                    {personName && (
                      <p className="text-primary text-lg md:text-2xl font-nexa font-black">
                        {personName}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewCard;
