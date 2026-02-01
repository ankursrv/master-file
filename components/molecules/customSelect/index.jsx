import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { cn } from '@/lib/utils'
import Icons from '@/components/atoms/icons'

const CustomSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  required,
  error,
  errorMessage
}) => {
  const selectedOption = options?.find(opt => opt.value === value)

  return (
    <div className="w-full">
      {label && (
        <label className="block font-semibold mb-3">
          {label}
          {required && <span className="ml-1">*</span>}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton
              className={cn(
                "relative w-full cursor-pointer rounded-lg bg-baby-powder py-3 pl-4 pr-10 text-left border h-[60px]",
                "focus:outline-none focus:ring-1 focus:ring-theme-primary",
                error ? "border-red-500" : "border-gray-300",
                "transition-all duration-200"
              )}
            >
              <span className={cn(
                "block truncate",
                !value && "text-gray-400"
              )}>
                {selectedOption?.label || placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Icons.DownIcon
                  className={cn(
                    "h-5 w-5 text-gray-400 transition-transform duration-200",
                    open && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              modal={false}
              className={cn(
                "absolute z-50 mt-1 w-[var(--button-width)] h-40 overflow-auto rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 focus:outline-none scrollbar-theme1"
              )}
            >
              {options.length > 0 ? (
                options.map((option) => (
                  <ListboxOption
                    key={option.value}
                    value={option.value}
                    className={({ focus, selected }) =>
                      cn(
                        "relative cursor-pointer select-none py-2.5",
                        focus ? "bg-theme-primary/10 text-theme-primary" : "text-gray-900",
                        "transition-colors duration-150"
                      )
                    }
                  >
                    {option.label}
                  </ListboxOption>
                ))
              ) : (
                <div className="py-2 px-4 text-sm text-gray-500">
                  No options available
                </div>
              )}
            </ListboxOptions>
          </div>
        )}
      </Listbox>

      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}

export default CustomSelect