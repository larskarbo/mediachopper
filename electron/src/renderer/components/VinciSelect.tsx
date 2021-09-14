import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { Fragment } from 'react';

export type VinciSelectOption = {
  title: string;
  icon?: any;
};

export default function VinciSelect({
  selected,
  className = '',
  onSelect,
  options,
}: {
  selected: VinciSelectOption;
  className?: string;
  onSelect: (option: VinciSelectOption) => void;
  options: VinciSelectOption[];
}) {
  return (
    <div className={className}>
      <Listbox value={selected} onChange={onSelect}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              'relative w-full pl-3 pr-10 text-left border h-8 border-black text-gray-300 rounded-sm bg-gray-700 ',
              ' cursor-default text-sm',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500'
            )}
          >
            <div className="flex items-center gap-2 truncate">
              {selected.icon && <selected.icon className="block truncate" />}
              {selected.title}
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute w-full py-1 mt-1 overflow-auto  text-xs bg-gray-800 border border-black rounded-sm shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `${active ? 'text-gray-300 bg-gray-900' : 'text-gray-400'}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {option.title}
                      </span>
                      {option.icon ? (
                        <span
                          className={`${
                            active ? 'text-gray-400' : 'text-gray-600'
                          }
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
                          {option.icon && <option.icon className="w-5 h-5" />}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
