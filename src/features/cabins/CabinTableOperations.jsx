import TableOperations from "../../ui/TableOperations"
import React from "react"
import { Filter } from "../../ui/Filter"
import { SortBy } from "../../ui/SortBy"
export const CabinTableOperations = () => {
    return(
        <TableOperations>
            <Filter filterFieldName='discount' options={[
                {value:'all',label:'All'}, {value: 'no-discount', label:'No Discount'}, {value:'with-discount', label:'With Discount'}
            ]}/>
            <SortBy 
            options={[
                {value:'name-asc', label:'Sort by name (A-Z)' }, 
                {value:'name-desc', label:'Sort by name (Z-A)'}, 
                {value:'regularPrice-asc', label:'Sort by price (low-high)'},
                {value:'regularPrice-desc', label:'Sort by price (high-low)'},
                {value:'maxCapacity-asc', label:'Sort by capacity (low-high)'},
                {value:'maxCapacity-desc', label:'Sort by capacity (high-low)'},
                ]}>
            </SortBy>
        </TableOperations>
        
    )
}
