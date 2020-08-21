import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import FilterScreenContext from '../contexts/FilterScreen'
import SortContext from '../contexts/Sort'
import FilterField from './filterField'
import FilterSection from './filterSection'
import SortDropdown from './sortDropdown'
import SortOrderDropdwon from './sortOrderDropdown'

const StyledDiv = styled.div`
  height: 50%;
  width: fit-content;
  padding: 35px 55px 15px 35px;
  box-sizing: border-box;
  position: fixed;
  right: 30px;
  bottom: 100px;
  background: white;
  opacity: ${({filterScreen}) => filterScreen ? 1 : 0};
  transition: opacity 0.2s;
  z-index: ${({filterScreen}) => filterScreen ? -1 : -3};; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.6);
  border-radius: 20px;
  overflow-y: scroll;
`

const StyledContainer = styled.div`
  margin-top: -5px;
`

function FilterScreen(props) {
  const {filterScreen} = useContext(FilterScreenContext)
  const {sortValue, setSortValue} = useContext(SortContext)
  const {currentDropdown, setCurrentDropdown} = useState()

  function setSortValueField(field) {
    let newSortValue = {
      field: field,
      descending: sortValue.descending
    }
    
    setSortValue(newSortValue)
  }

  function setSortOrder(value) {
    let newValue;

    if(value == "ASCENDING") {
      newValue = false
    } else if(value == "DESCENDING") {
      newValue = true
    }

    let newSortValue = {
      field: sortValue.field,
      descending: newValue
    }

    setSortValue(newSortValue)
  }

  const sortValues = {
    DISTANCE: "Distance",
    OCCUPIED_GENERAL: "General Ward Occupied",
    AVAILABLE_GENERAL: "General Ward Available",
    OCCUPIED_HDU: "HDU Occupied",
    AVAILABLE_HDU: "HDU Available",
    OCCUPIED_ICU: "ICU Occupied",
    AVAILABLE_ICU: "ICU Available",
    USED_VENTILATORS: "Ventilators Used",
    AVAILABLE_VENTILATORS: "Ventilators Available"
  }

  const sortOrder = {
    ASCENDING: "Increasing",
    DESCENDING: "Decreasing"
  }

  const fields = {
    "gov hos": "Government Hospital",
    "gov med": "Government Medical College",
    "pri hos": "Private Hospital",
    "pri med": "Private Medical College",
    "covid": "Covid Care Centres"
  }

  let CategoryFilterFields = Object.keys(fields).map(key => <FilterField key={key} value={key}>{fields[key]}</FilterField>)

  return (
    <StyledDiv filterScreen={filterScreen}>
      <FilterSection name="Sort By">
        <StyledContainer>
          <SortDropdown values={sortValues} value={sortValue.field} setValue={setSortValueField}/>
          <SortOrderDropdwon values={sortOrder} value={sortValue.descending ? "DESCENDING" : "ASCENDING"} setValue={setSortOrder}/>
        </StyledContainer>
      </FilterSection>
      <FilterSection name="Category">
        {CategoryFilterFields}
      </FilterSection>
    </StyledDiv>
  ) 
}

export default FilterScreen