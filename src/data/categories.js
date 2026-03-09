import { reactive } from 'vue'

import tabletIcon from "../assets/icons/tablet.png";
import capsuleIcon from "../assets/icons/capsules.png";
import syrupIcon from "../assets/icons/syrups.png";
import injectionIcon from "../assets/icons/injections.png";
import inhalerIcon from "../assets/icons/inhalers.png";
import dropsIcon from "../assets/icons/drops.png";
import ointmentIcon from "../assets/icons/ointments.png";
import suppositoryIcon from "../assets/icons/suppositories.png";
import patchIcon from "../assets/icons/patches.png";
import powderIcon from "../assets/icons/powders.png";
import vitaminsIcon from "../assets/icons/vitamins.png";
import firstAidIcon from "../assets/icons/first-aid.png";

export const categories = reactive([
  { id: 1, name: "Tablets", slug: "tablets", image: tabletIcon },
  { id: 2, name: "Capsules", slug: "capsules", image: capsuleIcon },
  { id: 3, name: "Liquids & Syrups", slug: "liquids-syrups", image: syrupIcon },
  { id: 4, name: "Injections", slug: "injections", image: injectionIcon },
  { id: 5, name: "Inhalers", slug: "inhalers", image: inhalerIcon },
  { id: 6, name: "Eye/Ear Drops", slug: "eye-ear-drops", image: dropsIcon },
  { id: 7, name: "Ointments & Creams", slug: "ointments-creams", image: ointmentIcon },
  { id: 8, name: "Suppositories", slug: "suppositories", image: suppositoryIcon },
  { id: 9, name: "Implants & Patches", slug: "implants-patches", image: patchIcon },
  { id: 10, name: "Powders", slug: "powders", image: powderIcon },
  { id: 11, name: "Vitamins & Supplements", slug: "vitamins-supplements", image: vitaminsIcon },
  { id: 12, name: "First Aid & Bandages", slug: "first-aid-bandages", image: firstAidIcon },
])
