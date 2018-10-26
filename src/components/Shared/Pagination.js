import React, { Component } from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
var debounce = require('lodash.debounce')
import lodash from 'lodash'
class NewPagination extends Component {
  state = {
    pager: {},
    pageSize: 10,
    initialPage: 1
  }
  componentWillMount() {
    // set page if items array isn't empty
    if (!_.isEmpty(this.props.items) && !_.isNull(this.props.items)) {
      this.setPage(this.state.initialPage, false);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
        this.setPage(this.state.initialPage, false);
    }
  }
  setPage(page, disabled) {
    var items = this.props.items;
    var pager = this.state.pager;
    var pageSize = this.state.pageSize;
    if(!disabled){
      // console.log('set page function: ', page, pager)
      // get new pager object for specified page
      pager = this.getPager(items.length, page, pageSize);
      // console.log('pager: ', pager)
      // get new page of items from items array
      var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      // update state
      this.setState({ pager: pager });
      // call change page function in parent component
      this.props.onChangePage(pageOfItems, pager.currentPage);
    }
  }
  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;
    // default page size is 10
    pageSize = pageSize || 10;
    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);
    var startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    var pages = _.range(startPage, endPage + 1);
    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }
  handleChange = (e, { value }) => {
    this.setState({
      pageSize: value
    }, debounce(this.setPage.bind(this,1), 10))
  }
  render() {
    var pager = this.state.pager;
    var pageSize = this.state.pageSize;
    if (!pager.pages) {
      return null;
    }
    const showDropdown = _.isUndefined(this.props.pageDropdown) ? true : this.props.pageDropdown
    return (
      <div className='flex'>
        {
          showDropdown
          ? <PageDropdown pageSize={pageSize} handleChange={this.handleChange.bind(this)} all={this.props.items.length}/>
          : null
        }
        <ul className="pagination" style={{position:'relative',float:'right',marginRight:'12px',marginTop:'9px'}}>
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => this.setPage(1, pager.currentPage === 1)}><Icon name='step backward'/></a>
            </li>
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => this.setPage(pager.currentPage - 1, pager.currentPage === 1)}><Icon name='chevron left'/></a>
            </li>
            {pager.pages.map((page, index) =>
                <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                    <a onClick={() => this.setPage(page)} >{page}</a>
                </li>
            )}
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <a onClick={() => this.setPage(pager.currentPage + 1, pager.currentPage === pager.totalPages)}><Icon name='chevron right'/></a>
            </li>
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <a onClick={() => this.setPage(pager.totalPages, pager.currentPage === pager.totalPages)}><Icon name='step forward'/></a>
            </li>
        </ul>
      </div>
    );
  }
}
const PageDropdown = props => {
  const options = [
    { key: 1, text: '10 / Page ', value: 10 },
    { key: 2, text: '20 / Page ', value: 20 },
    { key: 3, text: '30 / Page ', value: 30 },
    { key: 4, text: '40 / Page ', value: 40 },
    { key: 5, text: '50 / Page ', value: 50 },
    { key: 6, text: 'All', value: props.all }
  ]
  return(


    <Dropdown placeholder={`${props.pageSize} / Page `} options={options}
      upward basic button onChange={props.handleChange} className='page-ctr' style={{marginLeft:'12px',marginTop:'8px'}}/>
  )

}
export default NewPagination
