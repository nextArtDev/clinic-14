import Image from 'next/image'
import Link from 'next/link'

import { footerLinks } from '@/constants'

type ColumnProps = {
  title: string
  links?: Array<{ title: string; url: string }>
}

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex-1 flex flex-col gap-2 md:text-sm text-xm min-w-max">
    <h4 className="font-semibold mix-blend-multiply text-blue-400 ">{title}</h4>
    <ul className="flex flex-col gap-1 font-normal  ">
      {links?.map((link) => (
        <Link href={link.url} key={link.title} className="hover:text-gray-600 ">
          {link.title}
        </Link>
      ))}
    </ul>
  </div>
)

const Footer = () => (
  <div
    className="gradient-base relative min-h-screen h-[750px]"
    style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
  >
    <div className="fixed bottom-0  h-[670px] w-full">
      <section className="gradient-base   text-black px-8 flex items-center justify-start flex-col paddings w-full gap-20 border-t border-t-primary/30  ">
        <div className="flex flex-col gap-8 w-full text-xs md:text-sm lg:text-base ">
          <div className="flex items-start flex-col">
            {/* <Image src="/logo-purple.svg" width={116} height={38} alt="logo" /> */}

            <p className="mix-blend-multiply text-blue-600 text-start text-sm font-normal mt-5 max-w-xs">
              {/* Flexibble is the world&apos;s leading community for creatives to
          share, grow, and get hired. */}
              درمانگاه شبانه روزی آیین شفق
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <FooterColumn
              title={footerLinks[0].title}
              links={footerLinks[0].links}
            />

            <div className="flex-1 flex flex-col gap-4 flex-wrap  ">
              <FooterColumn
                title={footerLinks[1].title}
                links={footerLinks[1].links}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 flex-wrap pointer-events-none ">
              <FooterColumn
                title={footerLinks[2].title}
                links={footerLinks[2].links}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 flex-wrap pointer-events-none ">
              <FooterColumn
                title={footerLinks[3].title}
                links={footerLinks[3].links}
              />
            </div>

            {/* <FooterColumn
          title={footerLinks[3].title}
          //   links={footerLinks[3].links.url}
        />

        <div className="flex-1 flex flex-col gap-4">
          <FooterColumn
            title={footerLinks[4].title}
            // links={footerLinks[4].links.url}
          />
          <FooterColumn
            title={footerLinks[5].title}
            // links={footerLinks[5].links.url}
          />
        </div>

        <FooterColumn
          title={footerLinks[6].title}
          //   links={footerLinks[6].links.url}
        /> */}
          </div>
        </div>
        <p className="mix-blend-multiply text-blue-400  text-center text-sm font-normal max-w-md">
          اصفهان-ابتدای اتوبان ذوب‌آهن- بلوار شفق-نبش کوچه 12 - پلاک 13
          <br />
          تلفن: 031-37888561
          {' و '}
          031-37884672
        </p>
        {/* <div className="flex justify-between items-center max-sm:flex-col w-full text-sm font-normal  "> */}
        <p dir="ltr" className="text-center text-black/40 ">
          @2023 Saeid. All rights reserved
        </p>
        {/* <p className="text-gray">
        <span className="text-black font-semibold">10,214</span> projects
        submitted
      </p> */}
        {/* </div> */}
      </section>
    </div>
  </div>
)

export default Footer
