import { useCountries } from "@/lib/get-countries";
import { AddressBox } from "../_components/AddressBox";

export default function PrivatePage() {
  return (
    <>
      <h1>This page is used for testing AddressSearchBox</h1>
      <AddressBox />
    </>
  );
}
