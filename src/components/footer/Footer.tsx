import React from "react";
import useWindowSize from '../../hook/useWindowSize'

const Footer = () => {

    const size = useWindowSize()
    const isMobile = size.width <= 768;

    return (
        <div className="bg-white text-center py-4 pr-2 pl-2 text-sm">
            Copyright © 2023 <strong>Moneyweekly Publishing Ltd.</strong> All Rights Reserves.本網站版權屬於 理財周刊股份有限公司{isMobile && (<br />)}所有，未經本站同意，請勿擅用文字及圖案
        </div>
    )
}

export default Footer