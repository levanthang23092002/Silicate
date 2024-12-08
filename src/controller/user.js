const jwt = require("jsonwebtoken");
const service = require("../service/service");

exports.login = (req, res) => {
  const { email, password } = req.body;
  let values = [email ? email : null, password ? password : null];

  service.login(values, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Lỗi Hệ Thống",
        data: {},
        error_code: err,
      });
    } else if (result === 0) {
      res.status(401).json({
        success: true,
        message: "Vui lòng điền đây đủ thông tin đăng nhập ",
        data: {},
        error_code: null,
      });
    } else if (result === 1) {
      res.status(402).json({
        success: true,
        message: "Gmail hoặc mật khẩu sai vui lòng nhập đúng ",
        data: {},
        error_code: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Đăng nhập Thành Công",
        data: result,
        error_code: null,
      });
    }
  });
};

exports.addproduct = (req, res) => {
  const {
    name_vi,
    description_vi,
    benefits1_vi,
    benefits2_vi,
    benefits3_vi,
    benefits4_vi,
    benefits5_vi,
    name_en,
    description_en,
    benefits1_en,
    benefits2_en,
    benefits3_en,
    benefits4_en,
    benefits5_en,
    name_zh,
    description_zh,
    benefits1_zh,
    benefits2_zh,
    benefits3_zh,
    benefits4_zh,
    benefits5_zh,
    image,
  } = req.body;

  let values = [name_vi, description_vi, benefits1_vi, benefits2_vi, benefits3_vi, benefits4_vi, benefits5_vi,
    name_en, description_en, benefits1_en, benefits2_en, benefits3_en, benefits4_en, benefits5_en,
    name_zh, description_zh, benefits1_zh, benefits2_zh, benefits3_zh, benefits4_zh, benefits5_zh, image,
  ];
  service.addProduct(values, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        error: error,
      });
    } else {
      if (results === 1) {
        res.status(401).json({
          message: "Tên Đã bị Trùng vui lòng chọn tên khác cho phù hợp",
          data: results,
        });
      } else if (results === 2) {
        res.status(403).json({
          message:
            "Dữ liệu không hợp lệ (thiếu thông tin bắt buộc như : Tên, Ảnh và Mô tả cho tất cả các ngôn ngữ)",
          data: results,
        });
      } else {
        res.status(200).json({
          message: "Đã Thêm Thông tin thành công",
          data: results,
        });
      }
    }
  });
};

exports.getListProduct = (req, res) => {
  const lang = req.query.lang || "vi";
  service.getListProduct(lang, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error,
      });
    } else {
      if (results === 1) {
        res.status(400).json({
          message: "Không Thấy Product",
          data: null,
          error: null,
        });
      } else {
        res.status(200).json({
          success: true,
          data: results,
          error: null,
        });
      }
    }
  });

};

exports.getProduct = (req, res) => {
  const id = req.query.id;
  const lang = req.query.lang || "vi";
  service.getProduct(id, lang, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error,
      });
    } else {
      if (results === 1) {
        res.status(400).json({
          message: "Không Thấy Product",
          data: null,
          error: null,
        });
      } else {
        res.status(200).json({
          success: true,
          data: results,
          error: null,
        });
      }
    }
  });
};

exports.getProductDetail = (req, res) => {
  const id = req.query.id;
  service.getProductDetail(id, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error,
      });
    } else {
      if (results === 1) {
        res.status(400).json({
          message: "Không Thấy Product",
          data: null,
          error: null,
        });
      } else {
        res.status(200).json({
          success: true,
          data: results,
          error: null,
        });
      }
    }
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.query.id;
  service.deleteProduct(id, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error,
      });
    } else {
      if (results === 1) {
        res.status(400).json({
          message: "Không Thấy Product",
          data: null,
          error: null,
        });
      } else {
        res.status(200).json({
          success: true,
          data: results,
          error: null,
        });
      }
    }
  });
};

exports.updateProduct = (req, res) => {
  const id = req.query.id;
  const {
    name_vi,
    description_vi,
    benefits1_vi,
    benefits2_vi,
    benefits3_vi,
    benefits4_vi,
    benefits5_vi,
    name_en,
    description_en,
    benefits1_en,
    benefits2_en,
    benefits3_en,
    benefits4_en,
    benefits5_en,
    name_zh,
    description_zh,
    benefits1_zh,
    benefits2_zh,
    benefits3_zh,
    benefits4_zh,
    benefits5_zh,
    image,
  } = req.body;

  let values = [
    name_vi,
    description_vi,
    benefits1_vi,
    benefits2_vi,
    benefits3_vi,
    benefits4_vi,
    benefits5_vi,
    name_en,
    description_en,
    benefits1_en,
    benefits2_en,
    benefits3_en,
    benefits4_en,
    benefits5_en,
    name_zh,
    description_zh,
    benefits1_zh,
    benefits2_zh,
    benefits3_zh,
    benefits4_zh,
    benefits5_zh,
    image,
  ];

  service.updateProduct(id, values, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error,
      });
    } else {
      if (results === 1) {
        res.status(400).json({
          message: "Không Thấy Product",
          data: null,
          error: null,
        });
      } else {
        res.status(200).json({
          success: true,
          data: results,
          error: null,
        });
      }
    }
  });
};


exports.updateLangDefault = (req, res) => {

  const { lang } = req.body;

  service.updateLangDefault(lang, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Cập Nhật Thành Công",
        data: results,
        error: null,
      });
    }
  });
}