const LayoutData = {
  view_config_error: '界面配置错误，请检查页面HTML data-app标签是否出错',
};

const ItsAppData = {
  download_module_failed_message: '下载模块失败',
  unable_to_get_webconfig: '获取系统配置信息失败',
};

const Request = {
  loading: '正在请求中...',
  Network_Error: '网络发生错误',
};

const ModelDriver = {
  no_servers: '没有可用的计算服务器!',
  queue_servers: '计算服务器正在计算其他模型，请稍等!',
  server_is_busy: '有其他服务正在计算，请稍后再启动计算',
  running_fail: '计算失败!',
  running_success: '计算成功!',
  cancel_fail: '取消模型计算失败!',
  cancel_success: '取消模型计算成功!',
  prepare_fail: '准备计算时出错!',
  start_to_run: '初始化...',
  model_running: '计算中...',
  model_preparing: '准备中...',
  cancel_to_run: '取消',
  choose_servers: '选择模型计算服务器',
  server_queue: '排队数',
  server_memory: '内存使用',
  server_cpu: 'CPU使用',
  server_last_time: '计算已运行',
  unselect_server: '未选择模型计算服务器',
};

const Tree = {
  toolbox_add: '添加节点',
  toolbox_remove: '删除节点',
  toolbox_copy: '复制节点',
  toolbox_cut: '移动节点',
  toolbox_paste: '粘贴节点',
  tool_group_name: '节点名',
  tool_new_group: '新节点',
  tool_confirm: '确定',
  tool_success_cut: '移动节点成功!',
  tool_fail: '操作失败!',
  tool_success_copy: '复制节点成功!',
  toolbox_yes: '确定',
  toolbox_no: '取消',
};

export default class I18NData {
  public layout = LayoutData;

  public itsApp = ItsAppData;

  public request = Request;

  public driver = ModelDriver;

  public tree = Tree;
}
