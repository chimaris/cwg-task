import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getCountries } from "../services/api/countryApi";
import { useQuery } from "react-query";

function classNames(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}

const SelectInput = () => {
	const [selected, setSelected] = useState<{ country: string } | null>(null);
	const { data: countries } = useQuery("countries", getCountries, { staleTime: 1000 * 60 * 60 * 2, cacheTime: 1000 * 60 * 60 * 24 * 5 });

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<>
					<div className="relative mt-2">
						<Listbox.Button className="relative cursor-default rounded-full h-[50px] md:h-[58px] w-56 md:w-full bg-[#E7E7EE] py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6">
							<span className="flex items-center">
								<span className="ml-3 block truncate">{selected ? selected.country : "Select a country"}</span>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{countries &&
									countries.map((country: { country: string; iso3: string }, index: number) => (
										<Listbox.Option
											key={index}
											className={({ active }) =>
												classNames(active ? "bg-[#E2EEF8] text-[#297DD4]" : "text-gray-900", "relative cursor-default select-none py-2 pl-3 pr-9")
											}
											value={country}>
											{({ selected, active }) => (
												<>
													<div className="flex items-center">
														<span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>{country.country}</span>
													</div>
													{selected ? (
														<span
															className={classNames(active ? "text-white" : "text-[#50BBB5]", "absolute inset-y-0 right-0 flex items-center pr-4")}>
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};

export default SelectInput;
