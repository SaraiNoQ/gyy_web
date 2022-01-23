<template>
    <div>
      <!-- <el-button @click="getBookInfo()">info</el-button> -->
      <el-result :title="this.info.data[0].bookname"
       :subTitle="this.info.data[0].author"
       >
        <template slot="icon">
          <el-image :src="this.info.data[0].imgurl"></el-image>
        </template>
      </el-result>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        :current-page.sync="currentPage"
        @current-change="page"
        >
      </el-pagination>
    </div>
</template>

<script>
import { getRequest } from '../../utils/api.js'
export default {
  name: 'Shop',
  mounted () {
    /**
     * {page} 当前的页数
     * {size} 每页有多少条数据
     * 'book/getBookInfo/1/' + '1'
     */
    getRequest('book/getBookInfo/1/' + this.pageSize).then(resp => {
      this.info = resp
      this.total = this.info.total
      console.log(this.info.data[0].imgurl)
      console.log(this.info.total)
    })
  },
  data () {
    return {
      info: {},
      pageSize: 1,
      total: 50,
      currentPage: 1
    }
  },
  methods: {
    // getBookInfo () {
    //   getRequest('book/getBookInfo/1/1').then(resp => {
    //     console.log(resp)
    //   })
    // },
    page (currentPage) {
      getRequest('book/getBookInfo/' + currentPage + '/' + this.pageSize).then(resp => {
        this.info = resp
        this.total = this.info.total
      })
    }
  }
}
</script>
