<template>
	<div class="invite-friends">
		<div class='process'>
			<h1 class="title">邀请好友 分享惊喜</h1>
			<p class="summary">好友登陆爱驰汽车APP，赢取积分奖励<br/>先试后买 五大权益 先订先得</p>
			<div class="flex flex-ai-center flex-js-betw invite-container">
				<div class="invite-text">邀请流程</div>
				<div class="invite-link link" @click="fShowRule">详细规则</div>
			</div>
			<div class="flex flex-ai-center invite-process">
				<div class="flex flex-center flex-column">
					<img src="./assets/process1@2x.png" class="icon-process"/>
					<p>发送邀请链接</p>
				</div>
				<div class="flex1 flex flex-center flex-column">
						<img src="./assets/arrow@2x.png" class="icon-arrow"/>
						<p>&nbsp;</p>
				</div>
				<div class="flex flex-center flex-column">
					<img src="./assets/process2@2x.png" class="icon-process"/>
					<p>好友注册</p>
				</div>
				<div class="flex1 flex flex-center flex-column">
					<img src="./assets/arrow@2x.png" class="icon-arrow"/>
					<p>&nbsp;</p>
				</div>
				<div class="flex flex-center flex-column">
					<img src="./assets/process3@2x.png" class="icon-process"/>
					<p>好友登录APP</p>
				</div>
			</div>
		</div>
		<div class="prizes">
			<div class="title flex flex-ai-center">我的邀请奖励</div>
			<div class="flex flex-ai-center flex-js-betw item">
				<div class="points">活动获取积分：{{total}}分</div>
				<div class="btn active flex flex-center" @click="toMall">兑换</div>
			</div>
			<div class="flex flex-ai-center flex-js-betw item mg-t60">
				<div class="points">成功邀请好友：{{detail.successTotalInvitee}}位</div>
			</div>
      <!--注册-->
			<div class="list">
        <div class="list-item flex flex-ai-center flex-js-betw" v-for="(item,index) in inviteesInfo" :key='index'>
          <div class="headImg">
            <img :src="item.headUrl" />
          </div>
          <div class="flex1 flex flex-column userInfo">
            <p class="mobile">{{item.mobile}}</p>
            <p class="nickname">{{item.nickname}}</p>
            <p class="time">{{item.regTime}}</p>
          </div>
          <div class="status">
            <div class="status0 flex flex-center" v-if="item.status=='2'" @click="fFollow(item,true)">关注</div>
            <div class="status1" v-if="item.status=='1'">等待登录</div>
            <div class="status2 flex flex-center" v-if="item.status=='3'" @click="fFollow(item,false)">已关注</div>
          </div>
        </div>
        <div class="listtip" v-if="finished && inviteesInfo.length>0">暂无更多信息</div>
        <div class="listtip" v-if="!finished && inviteesInfo.length>0" @click="getListData">点击查看更多</div>
        <div class="emptyList flex flex-center flex-column" v-if="inviteesInfo.length==0">
          <img src="./assets/empty@2x.png" alt="好友为空"/>
        </div>
			</div>
      <!--购车-->
      <div class="flex flex-ai-center flex-js-betw item mg-t60">
      	<div class="points">成功订车好友：{{invite.inviationTotalCount}}位</div>
      </div>
      <div class="list">
        <div class="list-item flex flex-ai-center flex-js-betw" v-for="(item,index) in invationList" :key='index'>
          <div class="headImg">
            <img :src="item.headUrl" />
          </div>
          <div class="flex1 flex flex-column userInfo">
            <p class="mobile">{{item.mobile}}</p>
            <p class="nickname">{{item.nickname}}</p>
            <p class="time">{{item.invitTime|formatTime}}</p>
          </div>
          <div class="status">
            <div class="status2 flex flex-center" v-if="item.payFlag=='1'||item.payFlag=='10'||item.payFlag=='11'">待预定</div>
            <div class="status2 flex flex-center" v-if="item.payFlag=='2'||item.payFlag=='7'||item.payFlag=='9'||item.payFlag=='12'">意向金已付款</div>
            <div class="status2 flex flex-center" v-if="item.payFlag=='3'">定金已付款</div>
            <div class="status2 flex flex-center" v-if="item.payFlag=='6'">已取消</div>
            <div class="status2 flex flex-center" v-if="item.payFlag=='8'">已退款</div>
          </div>
        </div>
        <div class="listtip" v-if="finished1 && invationList.length>0">暂无更多信息</div>
        <div class="listtip" v-if="!finished1 && invationList.length>0" @click="getInviteListData">点击查看更多</div>
        <div class="emptyList flex flex-center flex-column" v-if="invationList.length==0">
          <img src="./assets/empty@2x.png" alt="好友为空"/>
        </div>
      </div>
      <div class="seatbox"></div>
		</div>

		<div class="footer flex flex-column">
			<div class="action flex flex-ai-center flex-js-betw">
				<div class="saoma flex flex-center" @click="toShare">扫码邀请</div>
				<div class="fenxiang flex flex-center" @click='fShare'>分享邀请</div>
			</div>
			<div class="safebottom"></div>
		</div>

		<div class="invite-rule-box" v-show="showRule" @touchmove.prevent></div>
		<transition name="fadeIn">
		<div class="invite-rule-container flex flex-center" v-show='showRule'>
			<div class="invite-rule-content">
				<p class="title">邀请规则</p>
				<p class="rule">
					1.爱驰汽车APP的用户均可通过该入口邀请身边的好友下载登录爱驰汽车APP，好友登录成功后，主邀请人和被邀请人均获得积分奖励。<br/>
					2.每位用户每天可邀请多位好友进行下载登录，但每位用户每天最多可获得3次积分奖励（邀请成功3人），如超过该次数，则不获得积分奖励，积分奖励次数会在每天晚上零点进行刷新。<br/>
					3.预定用户可邀请好友参与预定爱驰U5，预订用户成功推荐用户伙伴预订的，推荐者和被推荐者各额外获取1000积分，该部分额外获取的积分在预订的被推荐者转为预定用户后激活，激活后的积分可用于兑换爱驰精品。<br/>
          4.如预订用户在预订之日起14天内申请退订，预订获取的2000积分将被取消，如存在推荐的，相应推荐人及被推荐人额外获取的1000积分同步取消。<br/>
          5.本次活动仅限于手机实名制用户参与，未经实名制认证的手机号用户，将被认定为无效参与。<br/>
          文明参与，拒绝刷号，一旦发现通过机器登录注册、手机号所属非真实用户、邀请登录频率异常等刷分行为，将进行警告并封号，如用户违反规则上传内容造成爱驰汽车受到损失，爱驰汽车保留追究其法律责任的权利。<br/>
          相关活动咨询问题可拨打客服电话：<a href="tel:4008202555">400-820-2555</a>。<br/>
          活动全部解释权归爱驰汽车所有。
				</p>
				<p class="btn-confirm flex flex-center" @click="showRule=!showRule">确认</p>
			</div>
		</div>
		</transition>

	</div>
</template>

<script>
import { getList,getInvationList } from '@/api/inviteFriend.js'
import { parseTime } from '@/utils/index.js'
import { follow } from '@/api/information/marvellous.js'
import './styles/index.scss'
export default{
  data () {
    return {
      showRule: false,
      detail: {
        activityTotalPoints: 0,
        successTotalInvitee: 0,
      },
      inviteesInfo: [],
      invite:{
        inviationTotalCount: 0,
        points:0,
      },
      invationList:[],
      offset: 0,//邀请
      finished:false,
      offset1: 0,//购车
      finished1:false,
      limit: 5,
    }
  },
  computed: {
    userInfo: function () {
      return this.$store.state.bridge.userInfo
    },
    total: function () {
      return this.detail.activityTotalPoints + this.invite.points
    }
  },
  watch:{
    showRule(newVal,oldVal){
      if(newVal){
        document.body.setAttribute("style","position: fixed;height: 100%;overflow: hidden;width: 100%;")
      }else{
        document.body.setAttribute("style","")
      }
    }
  },
  filters: {
    formatTime: function (time) {
      return parseTime(time / 1000, '{y}-{m}-{d} {h}:{i}:{s}')
    }
  },
  mounted() {
    //邀请
    this.getListData()
    //购车
    this.getInviteListData()
  },
  methods: {
		fStatistics (id) {
		  this.$wk.statistics({
		    name: '1300071_APP_ME_INVITE_SW',
		    type: 3,
		    sendNow: 0,
		    detail: {}
		  })
		},
    toMall () {
      this.$wk.statistics({ name: '1200136_APP_ME_INVITE_REDEEM_CK', type: 1, sendNow: 0, detail: {} })
      this.$wk.pushRouter({
        path: '/auto/main',
        query: { hometab: 'shoppingMall' }
      })
    },
    toShare () {
      this.$wk.statistics({ name: '1200137_APP_ME_INVITE_SCAN_CK', type: 1, sendNow: 0, detail: {} })
      this.$router.push({ path: '/inviteShare' })
    },
    fShare () {
      this.$wk.statistics({ name: '1200138_APP_ME_INVITE_SHARE_CK', type: 1, sendNow: 0, detail: {} })
      const shareInfo = {
        link: window.location.origin + '/h5/#/landing-page?userId=' + this.userInfo.userId + '&recommendMobile=' + this.userInfo.mobile,
        title: '好友邀您体验先试后买爱驰U5，五大权益，先定先得',
        content: '即刻注册爱驰汽车APP，赢取积分奖励',
        desc: '即刻注册爱驰汽车APP，赢取积分奖励',
        imgUrl: window.location.origin + '/h5/icon.png'
      }
      this.$wk.share(shareInfo)
    },
    fShowRule () {
      this.showRule = true
    },
    getListData () {
      getList({ offset: this.offset, pageSize: this.limit, activityId: 1 }).then(resp => {
        this.detail.activityTotalPoints = resp.activityTotalPoints
        this.detail.successTotalInvitee = resp.successTotalInvitee
        this.inviteesInfo = this.inviteesInfo.concat(resp.inviteesInfo)
        if (resp.inviteesInfo.length < this.limit) {
          this.finished = true
        } else {
          this.offset += this.limit
        }
      })
    },
    getInviteListData(){
      getInvationList({ offset: this.offset1, limit: this.limit }).then(resp => {
        this.invite.points = resp.points
        this.invite.inviationTotalCount = resp.inviationTotalCount
        this.invationList = this.invationList.concat(resp.invationList)
        if (resp.invationList.length < this.limit) {
          this.finished1 = true
        } else {
          this.offset1 += this.limit
        }
      })
    },
    fFollow (item, flag) {
      follow({ bigvId: item.id, fansFlag: flag }).then(() => {
        if (flag) {
          item.status = 3
        } else {
          item.status = 2
        }
      })
    }
  }
}
</script>
