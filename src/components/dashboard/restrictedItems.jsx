import React, { useState } from 'react';
import jewelery from '../../assets/jewelery.jpg';
import explolsives from '../../assets/expolsives.jpeg';
import drugs from  '../../assets/drugs.jpeg';
import guns  from '../../assets/guns.jpeg';
import matches from '../../assets/matches.jpeg';
import flamable from '../../assets/flamable.jpeg';
import currency from '../../assets/currency.jpeg';
import passport from '../../assets/passport.jpeg';
import radioactive from '../../assets/Radioactive.jpeg';
import porn from '../../assets/porn.jpeg';
import check from '../../assets/uncrossedCheck.jpeg';
import corrosive from '../../assets/corr5osive.jpg';
import posion from '../../assets/poision.jpg';
import misc from '../../assets/misc.jpg';

export default function RestrictedItems() {
    const [bannedItems] = useState([
        { name: "Explosive", image: explolsives },
        { name: "Firearms and Accessories", image: guns },
        { name: "Matches and Lighters", image: matches },
        { name: "Flammable Liquides & Solids", image: flamable },
        { name: "Misceillaneous Dangerous Goods", image: misc },
        { name: "FCurrencies of any country", image: currency },
        { name: "Gold, Silver, Jewelry, Precious and Semi-precious items", image: jewelery },
        { name: "Uncrossed Checkque", image: check },
        { name: "Pornography", image: porn },
        { name: "Narcotic Drugs", image: drugs },
        { name: "Passport", image: passport },
        { name: "Poisons, Toxins, Infectious Substances", image: posion },
        { name: "Radio active Materials", image: radioactive },
        { name: "Corrosives", image: corrosive }
    ]);
    return (
        <div>
            <div className="banned-items">
                <h3>BANNED ITEMS LIST:</h3>
                <div className="banned-items-list">
                    <ul>
                        {bannedItems.map((item, index) => (
                            <li key={index}>
                                <img src={item.image} alt={item.name} />
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="restricted-items">
                <h3>RESTRICTED ITEMS:</h3>
                <ol>
                    <li>International Air Transport Association (IATA) restricted items like explosive flammable materials, radioactive material, plastics, gases, stuffed toys.</li>
                    <li>Electronics items like PC Boards, ICs, resistors, capacitors, switches, transformers, computer and computer parts, calculators, VCR and VCPs, television, radios, tape-recorders.</li>
                    <li>Electrical items like solenoid valves, electrical machinery like motors, plugs, pumps, switches, sockets, telephone instruments, wires, fuses and any item in which there are electrical wiring, batteries, and cells.</li>
                    <li>Wrist watches, clocks, alarm devices.</li>
                    <li>Bulk commodities like washing machines, cooking range, ovens, heavy machinery.</li>
                    <li>Bulk pharmaceuticals (solid or liquid).</li>
                    <div className="highlighted-point">
                        <ul>However, life-saving drugs or any other pharmaceutical drug in small quantity of approximately 1-2 light boxes of weight half to one Kg in finished product form like tablets can be uplifted provided proper certification is there. Life-saving drugs and medicines for personal use can be sent provided a Doctor’s prescription or certificate accompanies the shipment.</ul>
                    </div>
                    <div className="highlighted-point">
                        <ul>Battery and other articles whose transmission is prohibited by air will only be sent to the addressee through Surface mode only.</ul>
                    </div>
                    <li>No commercial consignments.</li>
                    <li>Dry ice used packaging </li>
                    <li>Liquid and oil (Sample liquid in small quantity properly packed can be accepted)</li>
                    <li>Magnetised items </li>
                    <li>Consignments in sealed containers viz. : Canned Tin Foods, Milk Powers, Spray etc. </li>
                    <li>No commercial consignments. </li>
                    <div className="highlighted-point">
                        <ul>Only sample shipments are allowed to be carried by couriers and the maximum weight per package should not exceed 30 Kgs.</ul>
                    </div>
                </ol>
            </div>
            <div className="dangerous-items">
                <h3>ITEMS THAT MAY CONTAIN DANGEROUS GOODS:</h3>
                <p>FOLLOWING ITEMS MAY CONTAIN DANGEROUS GOODS SO THESE REQUIRE PROPER UNDERSTANDING AND HANDLING SO AS NOT TO POSE A RISK TO THE HANDLER(S) OF THESE GOODS</p>
                <ul>
                    <li>Magnatized materials contained in computers</li>
                    <li>Flammable liquid or oxidizers in test samples</li>
                    <li>Aerosols and household liquids in personal belongings</li>
                    <li>Compressed or liquefied gas cylinders</li>
                    <li>Parts (batteries, engines) for cars, boats, and aircraft</li>
                    <li>Flammable gases in camping equipment</li>
                    <li>Flammable liquid and toxic substances in medical kits</li>
                </ul>
            </div>

        </div>

    )
}
