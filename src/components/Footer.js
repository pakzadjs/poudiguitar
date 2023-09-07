import { BsInstagram, BsYoutube, BsTelegram } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="py-6 md:py-8 text-slate-300 mt-10 bg-slate-400/30 px-4 rounded-t-3xl">
      <div className="grid gap-10 md:gap-14 grid-cols-5 grid-row-2 container md:max-w-screen-xl mx-auto">
        <div className="col-span-5 md:col-span-2 flex flex-col justify-start">
          <div>
            <h2 className="font-bold text-xs sm:text-sm mb-4 text-white">
              لورم ایپسوم با تولید سادگی نامفهوم از صنعت چاپ <strong>متن ساختگی</strong>
            </h2>

            <div className="sm:leading-7 text-xs sm:text-sm leading-5">
              <span className="text-white">
                <strong className="font-bold">پوریا احمدی هستم، موزیسین </strong>و مدیر وبسایت
                آموزش گیتار و موزیکِ پودی گیتار.
              </span>

              <p className="leading-5 md:leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
                ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،
                شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
                طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
                کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
                جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <ul className="flex  justify-between items-center w-full">
              {/* Instagram */}
              <li className="block">
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/poudiguitar/"
                  target="_blank"
                >
                  <BsInstagram
                    size={26}
                    className="hover:text-rose-500 transition-all duration-250"
                  />
                </a>
              </li>

              {/* Youtube */}
              <li className="block">
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/poudiguitar/"
                  target="_blank"
                >
                  <BsYoutube
                    size={26}
                    className="hover:text-red-500 transition-all duration-250"
                  />
                </a>
              </li>

              {/* Telegram */}
              <li className="block">
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/poudiguitar/"
                  target="_blank"
                >
                  <BsTelegram
                    size={26}
                    className="hover:text-sky-500 transition-all duration-250"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-5 md:col-span-1"></div>
        <div className="col-span-5 md:col-span-1"></div>
        <div className="col-span-5 md:col-span-1"></div>
        <div className="col-span-5">
          <p className="text-center tex-xs">© تمامی حقوق برای پودی گیتار محفوظ است</p>
        </div>
      </div>
    </footer>
  );
}
