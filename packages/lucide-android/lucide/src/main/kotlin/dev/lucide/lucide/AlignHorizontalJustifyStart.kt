package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.AlignHorizontalJustifyStart: ImageVector
    get() {
        if (_alignHorizontalJustifyStart != null) {
            return _alignHorizontalJustifyStart!!
        }
        _alignHorizontalJustifyStart = Builder(name = "AlignHorizontalJustifyStart", defaultWidth =
                24.0.dp, defaultHeight = 24.0.dp, viewportWidth = 24.0f, viewportHeight =
                24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 5.0f)
                lineTo(10.0f, 5.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 12.0f, 7.0f)
                lineTo(12.0f, 17.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 10.0f, 19.0f)
                lineTo(8.0f, 19.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 6.0f, 17.0f)
                lineTo(6.0f, 7.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 8.0f, 5.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(18.0f, 7.0f)
                lineTo(20.0f, 7.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 22.0f, 9.0f)
                lineTo(22.0f, 15.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 20.0f, 17.0f)
                lineTo(18.0f, 17.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 16.0f, 15.0f)
                lineTo(16.0f, 9.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 18.0f, 7.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.0f, 2.0f)
                verticalLineToRelative(20.0f)
            }
        }
        .build()
        return _alignHorizontalJustifyStart!!
    }

private var _alignHorizontalJustifyStart: ImageVector? = null
